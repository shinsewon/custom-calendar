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
        alert("변경 사항을 확인해주세요.");
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

  // 삭제 성공 모달
  function success() {
    Modal.success({
      style: { top: 200 },
      content: "정상적으로 수정되었습니다.",

      onOk() {
        dispatch(deleteEventSuccess(event));
        toggle();
      },
    });
  }

  //삭제 확인 버튼
  function showPromiseConfirm() {
    confirm({
      style: { top: 200 },
      title: "해당 일정을 삭제 하시겠습니까?",
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
