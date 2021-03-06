import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { isEmpty } from "lodash";
import { Form, Modal } from "antd";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import BootstrapTheme from "@fullcalendar/bootstrap";

import "@fullcalendar/bootstrap/main.css";
import ModalComponent from "./ModalComponent";
import { useStateContext, useDispatchContext } from "../context/context";
import {
  updateEvent,
  addNewEvent,
  deleteEventSuccess,
} from "../context/action";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const dateFormat = "YYYY/MM/DD";
const { confirm } = Modal;

function Calendar(props) {
  const [form] = Form.useForm();

  const dispatch = useDispatchContext();
  const { events } = useStateContext();

  let numRef = useRef(10);
  const [modal, setModal] = useState(false);
  const [event, setEvent] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (!modal && !isEmpty(event) && !!isEdit) {
      setTimeout(() => {
        setEvent({});
        setIsEdit(false);
        form.resetFields();
      }, 500);
    }
  }, [modal, event]);

  const toggle = () => {
    setModal(!modal);
  };

  const handleEventClick = (arg) => {
    const event = arg.event;
    const { id, title, start, startStr, end, endStr, classNames } = event;
    const customDate = (str) => {
      let result = "";
      result = str.split("T")[0];
      return result;
    };

    form.setFieldsValue({
      id,
      title,
      classNames: `${classNames[0]} text-white`,
      start: startStr,
      end: endStr,
      rangePiker: [
        moment(customDate(startStr), dateFormat),
        moment(customDate(endStr), dateFormat),
      ],
    });

    setEvent({
      id,
      title,
      start,
      end: end || null,
      classNames: `${classNames[0]} ${classNames[1]}`,
      rangePiker: [
        moment(customDate(startStr), dateFormat),
        moment(customDate(endStr), dateFormat),
      ],
    });
    setIsEdit(true);
    toggle();
  };

  const handleDistinguis = (values, event) => {
    const {
      title: prevTitle,
      classNames: prevClassNames,
      start: prevStart,
      end: prevEnd,
    } = event;
    const {
      title: nextTitle,
      classNames: nextClassNames,
      rangePiker: nextDay,
    } = values;

    return (
      prevTitle === nextTitle &&
      prevClassNames === nextClassNames &&
      String(prevStart).split(" ").slice(0, 4).join("") ===
        String(nextDay[0]._d).split(" ").slice(0, 4).join("") &&
      String(prevEnd).split(" ").slice(0, 4).join("") ===
        String(nextDay[1]._d).split(" ").slice(0, 4).join("")
    );
  };

  const handleSubmit = (values) => {
    const rangeValue = values["rangePiker"];
    if (isEdit) {
      if (handleDistinguis(values, event)) {
        alert("?????? ????????? ??????????????????.");
      } else {
        const events = {
          id: event.id,
          title: values.title,
          classNames: `${values.classNames}`,
          start: values.rangePiker[0]._d,
          end: values.rangePiker[1]._d,
        };
        dispatch(updateEvent(events));
        toggle();
      }
    } else {
      const events = {
        id: numRef,
        title: values.title,
        classNames: `${values.classNames}`,
        start: values.rangePiker[0]._d,
        end: values.rangePiker[1]._d,
        rangeValue: [
          rangeValue[0].format("YYYY-MM-DD"),
          rangeValue[1].format("YYYY-MM-DD"),
        ],
      };

      dispatch(addNewEvent(events));
      numRef += 1;
      toggle();
    }
  };

  const handleResetEvent = () => {
    form.setFieldsValue({});
    toggle();
  };

  // ?????? ?????? ??????
  function success() {
    Modal.success({
      style: { top: 200 },
      content: "??????????????? ?????????????????????.",

      onOk() {
        dispatch(deleteEventSuccess(event));
        toggle();
      },
    });
  }

  //?????? ?????? ??????
  function showPromiseConfirm() {
    confirm({
      style: { top: 200 },
      title: "?????? ????????? ?????? ???????????????????",
      icon: <ExclamationCircleOutlined />,

      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(success());
          }, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {},
    });
  }

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, BootstrapTheme, interactionPlugin]}
        initialView="dayGridMonth"
        handleWindowResize={true}
        slotDuration={"00:15:00"}
        themeSystem="bootstrap"
        events={events}
        eventClick={handleEventClick}
        select={handleResetEvent}
        editable={true} // ????????? ????????? ??????
        droppable={true} // ?????? ???????????? ?????? ????????? ????????? ?????? ?????? ???????????? ???????????? ?????? ??? ????????? ????????? ??????
        selectable={true} // ???????????? ???????????? ??????????????? ?????? ??? ?????? ???????????? ?????? ??????
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,dayGridWeek,dayGridDay",
        }}
      />
      <ModalComponent
        isEdit={isEdit}
        form={form}
        event={event}
        openModal={modal}
        toggle={toggle}
        onFinish={handleSubmit}
        showPromiseConfirm={showPromiseConfirm}
      />
    </>
  );
}

export default Calendar;
