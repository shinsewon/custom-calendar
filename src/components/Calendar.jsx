import React, { useState, useEffect, useCallback, useRef } from "react";
import { isEmpty } from "lodash";
import { Form, Input } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";

import { AvField, AvForm } from "availity-reactstrap-validation";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import "@fullcalendar/bootstrap/main.css";
import ModalComponent from "./ModalComponent";
import { useStateContext, useDispatchContext } from "../context/context";
import { updateEvent, addNewEvent } from "../context/action";

function Calendar(props) {
  const [form] = Form.useForm();

  const dispatch = useDispatchContext();
  const { events, error, categories } = useStateContext();

  let numRef = useRef(10);
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      console.log("useEffet!!!");
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);

        form.setFieldsValue({
          id: event.id,
          title: "",
          className: "",
          start: "",
          end: "",
        });
      }, 500);
    }
  }, [modal, event]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleDateClick = (arg) => {
    setSelectedDay(arg);
    toggle();
  };

  const handleEventClick = (arg) => {
    const event = arg.event;
    const { id, title, start, startStr, end, endStr } = event;

    console.log("@@@@@@@@@@@event@@@@@@@@@@@@@@@@@", event);
    console.log("start>>>", start);
    console.log("end>>>", end);
    form.setFieldsValue({
      id: event.id,
      title: event.title,
      className: event.classNames,
      start: event.startStr,
      end: event?.endStr || null,
      // rangeTime: [start, end || start],
    });

    setEvent({
      id,
      title,
      start,
      startStr,
      end: end || null,
      endStr,
      className: event.classNames,
    });
    setIsEdit(true);
    toggle();
  };

  const handleSubmit = (values) => {
    if (isEdit) {
      const rangeTimeValue = values["rangeTime"];
      console.log("rangeTimeValue>>>", rangeTimeValue);
      const events = {
        id: event.id,
        title: values.title,
        className: `${values.className} text-white`,
        start: rangeTimeValue[0].format("YYYY-MM-DDTHH:mm:ss"),
        end: rangeTimeValue[1].format("YYYY-MM-DDTHH:mm:ss") || null,
        // rangeTime: [
        //   rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
        //   rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
        // ],
      };

      form.setFieldsValue({
        id: event.id,
        title: event.title,
        className: event.className,
        start: event.start,
        end: event?.end,
        // rangeTime: [
        //   rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
        //   rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
        // ],
      });

      dispatch(updateEvent(events));
    } else {
      const rangeTimeValue = values["rangeTime"];
      const events = {
        id: numRef,
        title: values.title,
        className: `${values.className} text-white`,
        start: rangeTimeValue[0].format("YYYY-MM-DDTHH:mm:ss"),
        end: rangeTimeValue[1].format("YYYY-MM-DDTHH:mm:ss") || null,
        // rangeTime: [
        //   rangeTimeValue[0].format("YYYY-MM-DD HH:mm:ss"),
        //   rangeTimeValue[1].format("YYYY-MM-DD HH:mm:ss"),
        // ],
      };

      dispatch(addNewEvent(events));
      numRef += 1;
    }
    values = null;
    toggle();
  };

  const handleResetEvent = () => {
    console.log("handleResetEvent>>>>>>>>>.");
    // setEvent({});

    ////
  };

  // useEffect(() => {
  //   form.setFields({
  //     title: 3,
  //   });
  // }, []);

  return (
    <>
      <Form form={form}>
        <Form.Item
          name="title"
          label="title"

          // rules={[{ required: true, message: "Please select your title!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
      <FullCalendar
        plugins={[dayGridPlugin, BootstrapTheme, interactionPlugin]}
        initialView="dayGridMonth"
        handleWindowResize={true}
        slotDuration={"00:15:00"}
        themeSystem="bootstrap"
        events={events}
        eventClick={handleEventClick}
        select={handleResetEvent}
        dateClick={handleDateClick}
        editable={true} // 달력의 이벤트 수정
        droppable={true} // 다른 캘린더의 외부 드래그 가능한 요소 또는 이벤트를 캘린더에 놓을 수 있는지 여부를 결정
        selectable={true} // 사용자가 클릭하고 드래그하여 여러 날 또는 시간대를 강조 표시
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
      />
      <ModalComponent
        form={form}
        event={event}
        openModal={modal}
        toggle={toggle}
        onFinish={handleSubmit}
      />
    </>
  );
}

export default Calendar;
