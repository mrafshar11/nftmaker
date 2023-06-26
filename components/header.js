import React from "react";
import { Row, Col, Input, Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  return (
    <Row style={{ height: "60px", padding: "0 20px", alignItems: "center" }}>
      <Col md={{ span: 14 }}>
        <Image width={120} height={40} src="/images/logo.jpg" />
      </Col>
      <Col md={{ span: 2 }}>Dashbaord</Col>
      <Col md={{ span: 3 }}>Help & Support</Col>
      <Col md={{ span: 2 }}>Pricing</Col>
      <Col md={{ span: 3 }}>
        <Link
          href="/"
          style={{
            width: "100px",
            backgroundColor: "#fff",
            display: "block",
            textAlign: "center",
            padding: "10px",
            borderRadius: "4px",
          }}
        >
          <UserOutlined style={{ marginRight: "10px" }} /> Korjani
        </Link>
      </Col>
    </Row>
  );
};

export default Header;
