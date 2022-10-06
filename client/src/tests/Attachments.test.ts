import React from 'react';
import { render, fireEvent, screen, cleanup } from "@testing-library/react";
// import Attachments from '../pages/Attachments/Attachments';
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux'

// jest.mock('react-router-dom', () => ({
//   useHistory: () => ({ push: jest.fn() }),
// }))

describe("Downlines unit testing",() => {

  // const MOCK_DOWNLINES = [
  //   {name: 'downline1', tfxi_id: 111111, attachment: 1000, referral: 'dawson', fund: 'GMC', join_date: new Date().toString(), referral_fee: 50},
  //   {name: 'downline2', tfxi_id: 222222, attachment: 1000, referral: 'khoo', fund: 'GMC', join_date: new Date().toString(), referral_fee: 50},
  //   {name: 'downline3', tfxi_id: 333333, attachment: 1000, referral: 'weiherr', fund: 'GMC PAMM', join_date: new Date().toString(), referral_fee: 50},
  // ]

  // const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
  // const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

  // beforeEach(() => {
  //     useSelectorMock.mockClear()
  //     useDispatchMock.mockClear()
  // })

  // test.each(MOCK_DOWNLINES)("each downline info is shown", (singleCase) => {

  //   useSelectorMock.mockReturnValue(MOCK_DOWNLINES)
  //   // ARRANGE
  //   const dummyDispatch = jest.fn()
  //   useDispatchMock.mockReturnValue(dummyDispatch)
  //   // expect(dummyDispatch).not.toHaveBeenCalled()

  //   render(<Downlines />);

  //   // const totalUSD = screen.getByTestId("totalUSD");
  //   const downlinesTable = screen.getByTestId("downlinesTable");

  //   // expect(totalUSD).toHaveTextContent("3000");
  //   expect(downlinesTable).toHaveTextContent(singleCase.name)
  //   expect(downlinesTable).toHaveTextContent(singleCase.tfxi_id)
  //   expect(downlinesTable).toHaveTextContent(singleCase.attachment)
  //   expect(downlinesTable).toHaveTextContent(singleCase.referral.charAt(0).toUpperCase() + singleCase.referral.slice(1))
  //   expect(downlinesTable).toHaveTextContent(singleCase.fund)
  //   expect(downlinesTable).toHaveTextContent(singleCase.join_date.split('T')[0])

  // });

  // test("if no downline loaded", () => {

  //   useSelectorMock.mockReturnValue([])
  //   const dummyDispatch = jest.fn()
  //   useDispatchMock.mockReturnValue(dummyDispatch)

  //   render(<Downlines />);

  //   const totalUSD = screen.getByTestId("totalUSD");
  //   const downlinesRow = screen.queryByTestId("downlinesRow");

  //   expect(totalUSD).toHaveTextContent("USD 0");
  //   expect(downlinesRow).toBeNull();

  // });

  test("kosong",() => {
    expect(1).toEqual(1);
  })
  
})

