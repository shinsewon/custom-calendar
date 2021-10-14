import React, { useRef, useLayoutEffect, useState, memo } from "react";
import { Modal, Button, Form, Select, Input, Row, Col, DatePicker } from "antd";
import { AvField, AvForm } from "availity-reactstrap-validation";
import { Card, CardBody, Container, ModalBody, ModalHeader } from "reactstrap";

const { Option } = Select;
const { RangePicker } = DatePicker;

function ModalComponent({
  openModal,

  toggle,
  isEdit,
  onFinish,
  handleValidEventSubmit,
  event,
  setDeleteModal,
  form,
}) {
  const { id, title, className, start, end, startStr, endStr, rangeTime } =
    event;

  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select time!",
      },
    ],
  };

  console.log("rangeTime>>>", rangeTime);

  console.log("모달 event>>>", event);
  return (
    <Modal
      visible={openModal}
      // className={className}
      title={!!isEdit ? "Edit Event" : "Add Event"}
      footer={null}
      closable={false}
    >
      <Form
        form={form}
        layout={"vertical"}
        onFinish={onFinish}
        initialValues={{ id, title, className, rangeTime }}
      >
        <Form.Item
          name="title"
          label="title"
          rules={[{ required: true, message: "Please select your title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="className"
          label="Select"
          rules={[{ required: true, message: "Please select your 물음표!" }]}
        >
          <Select placeholder="Please select a 물음표">
            <Option value="bg-danger">Danger</Option>
            <Option value="bg-success">Success</Option>
            <Option value="bg-primary">Primary</Option>
            <Option value="bg-info">Info</Option>
            <Option value="bg-dark">Dark</Option>
            <Option value="bg-warning">Warning</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="rangeTime"
          label="RangePicker[showTime]"
          {...rangeConfig}
        >
          <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
        </Form.Item>
        <Row>
          <Button onClick={toggle}>Cancel</Button>
          <Button>Delete</Button>
          <Form.Item>
            <Button htmlType={"submit"}>Save</Button>
          </Form.Item>
        </Row>
      </Form>
      {/*<ModalHeader toggle={toggle} tag="h4">*/}
      {/*  {!!isEdit ? "Edit Event" : "Add Event"}*/}
      {/*</ModalHeader>*/}
      {/*<ModalBody>*/}
      {/*  <AvForm onValidSubmit={handleValidEventSubmit}>*/}
      {/*    <Row form>*/}
      {/*      <Col className="col-12 mb-3">*/}
      {/*        <AvField*/}
      {/*          name="title"*/}
      {/*          label="Event Name"*/}
      {/*          type="text"*/}
      {/*          errorMessage="Invalid name"*/}
      {/*          validate={{*/}
      {/*            required: { value: true },*/}
      {/*          }}*/}
      {/*          value={event ? event.title : ""}*/}
      {/*        />*/}
      {/*      </Col>*/}
      {/*      <Col className="col-12 mb-3">*/}
      {/*        <AvField*/}
      {/*          type="select"*/}
      {/*          name="category"*/}
      {/*          label="Select Category"*/}
      {/*          validate={{*/}
      {/*            required: { value: true },*/}
      {/*          }}*/}
      {/*          value={event ? event.category : "bg-primary"}*/}
      {/*        >*/}
      {/*          <option value="bg-danger">Danger</option>*/}
      {/*          <option value="bg-success">Success</option>*/}
      {/*          <option value="bg-primary">Primary</option>*/}
      {/*          <option value="bg-info">Info</option>*/}
      {/*          <option value="bg-dark">Dark</option>*/}
      {/*          <option value="bg-warning">Warning</option>*/}
      {/*        </AvField>*/}
      {/*      </Col>*/}
      {/*    </Row>*/}
      {/*    <Row>*/}
      {/*      <Col>*/}
      {/*        <div className="text-end">*/}
      {/*          <button*/}
      {/*            type="button"*/}
      {/*            className="btn btn-light me-2"*/}
      {/*            onClick={toggle}*/}
      {/*          >*/}
      {/*            Close*/}
      {/*          </button>*/}
      {/*          {!!isEdit && (*/}
      {/*            <button*/}
      {/*              type="button"*/}
      {/*              className="btn btn-danger me-2"*/}
      {/*              onClick={() => setDeleteModal(true)}*/}
      {/*            >*/}
      {/*              Delete*/}
      {/*            </button>*/}
      {/*          )}*/}
      {/*          <button type="submit" className="btn btn-success save-event">*/}
      {/*            Save*/}
      {/*          </button>*/}
      {/*        </div>*/}
      {/*      </Col>*/}
      {/*    </Row>*/}
      {/*  </AvForm>*/}
      {/*</ModalBody>*/}
    </Modal>
  );
}

export default memo(ModalComponent);
