import React from "react";
import { Button, Col, Container, Dropdown, Form, InputGroup, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { CalculatorResult } from "../types";

type Props = {
    result:CalculatorResult,
    rate:number,
    decimal:number
}

const OverviewTable = ({result,rate,decimal}:Props) => {
  return (
    <>
    <Col sm={6}>
    <Table hover responsive="md">
        <tbody>
            <tr>
                <td className="head">
                    <p>Main Acc Profit</p>
                </td>
                <td className="content">
                    <p data-testid="mainAccProfit">{(result.main_acc_profit*(rate)).toFixed(decimal)}</p>
                </td>
            </tr>
            <tr>
                <td className="head">
                    <p>Shared Acc Profit</p>
                </td>
                <td className="content">
                    <p>{(result.shared_acc_profit*(rate)).toFixed(decimal)}</p>
                </td>
            </tr>
            <tr>
                <td className="head">
                    <p>Shared Acc Commission</p>
                </td>
                <td className="content">
                    <p>{(result.shared_acc_commission*(rate)).toFixed(decimal)}</p>
                </td>
            </tr>
            <tr>
                <td className="head">
                    <p>Total</p>
                </td>
                <td className="content">
                    <p>{((result.main_acc_profit + result.shared_acc_commission + result.shared_acc_profit)*(rate)).toFixed(decimal)}</p>
                </td>
            </tr>
        </tbody>
    </Table>
    </Col>

    <Col sm={6}>
        <Table hover responsive="md">
            <tbody>
                <tr>
                    <td className="head">
                        <p>Dawson's Commission</p>
                    </td>
                    <td className="content">
                        <p>{(result.dawson_commission*(rate)).toFixed(decimal)}</p>
                    </td>
                </tr>
                <tr>
                    <td className="head">
                        <p>Khoo's Commission</p>
                    </td>
                    <td className="content">
                        <p>{(result.khoo_commission*(rate)).toFixed(decimal)}</p>
                    </td>
                </tr>
                <tr>
                    <td className="head">
                        <p>Weiherr's Commission</p>
                    </td>
                    <td className="content">
                        <p>{(result.weiherr_commission*(rate)).toFixed(decimal)}</p>
                    </td>
                </tr>
                <tr>
                    <td className="head">
                        <p>Xiaofei's Commission</p>
                    </td>
                    <td className="content">
                        <p>{(result.xiaofei_commission*(rate)).toFixed(decimal)}</p>
                    </td>
                </tr>
                <tr>
                    <td className="head">
                        <p>Jasper's Commission</p>
                    </td>
                    <td className="content">
                        <p>{(result.jasper_commission*(rate)).toFixed(decimal)}</p>
                    </td>
                </tr>
            </tbody>
        </Table>
    </Col>
    </>

  );
}

export default OverviewTable;