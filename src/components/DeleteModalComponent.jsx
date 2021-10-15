import React, { memo } from "react";
import { Modal, Button, Form, Select, Input, Row, DatePicker } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;

function DeleteModalComponent({ openModal, toggle, isEdit, onFinish, form }) {
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
      title={!!isEdit ? "Edit Event" : "Add Event"}
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

export default memo(DeleteModalComponent);
