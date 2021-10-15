import React, { memo } from "react";
import { Modal, Button, Form, Select, Input, Row, DatePicker } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;


function ModalComponent({ openModal, toggle, isEdit, onFinish, form ,showPromiseConfirm}) {
  const rangeConfig = {
    rules: [
      {
        type: "array",
        required: true,
        message: "Please select Day!",
      },
    ],
  };




  return (
    <Modal

      visible={openModal}
      title={!!isEdit ? "일정 수정" : "일정 추가"}
      footer={null}
      closable={false}
    >
      <Form form={form} layout={"vertical"} onFinish={onFinish}>
        <Form.Item
          name="title"
          label="title"
          rules={[{ required: true, message: "Please select your title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="classNames"
          label="Select"
          rules={[{ required: true, message: "Please select your 물음표!" }]}
        >
          <Select placeholder="Please select a 물음표">
            <Option value="bg-danger text-white">Danger</Option>
            <Option value="bg-success text-white">Success</Option>
            <Option value="bg-primary text-white">Primary</Option>
            <Option value="bg-info text-white">Info</Option>
            <Option value="bg-dark text-white">Dark</Option>
            <Option value="bg-warning text-white">Warning</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="rangePiker"
          label="RangePicker[showTime]"
          {...rangeConfig}
        >
          <RangePicker />
        </Form.Item>
        <Row>
          <Button onClick={toggle}>Cancel</Button>
          {!!isEdit&&<Button onClick={showPromiseConfirm}>Delete</Button>}
          <Form.Item>
            <Button htmlType={"submit"}>Save</Button>
          </Form.Item>
        </Row>
      </Form>

    </Modal>
  );
}

export default memo(ModalComponent);
