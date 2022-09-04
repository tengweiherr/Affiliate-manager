import { render, fireEvent, screen, cleanup } from "@testing-library/react";
import Calculator from "../components/Calculator/Calculator"
import '@testing-library/jest-dom';
import * as reactRedux from 'react-redux'

describe("Calculator testing",() => {

    const MOCK_DOWNLINES = [
        {name: 'downline1', tfxi_id: 111111, attachment: 1000, referral: 'dawson', fund: 'GMC', join_date: new Date().toString(), referral_fee: 50},
        {name: 'downline2', tfxi_id: 222222, attachment: 1000, referral: 'khoo', fund: 'GMC', join_date: new Date().toString(), referral_fee: 50},
        {name: 'downline3', tfxi_id: 333333, attachment: 1000, referral: 'weiherr', fund: 'GMC PAMM', join_date: new Date().toString(), referral_fee: 50},
    ]

    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector')
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch')

    beforeEach(() => {
        useSelectorMock.mockClear()
        useDispatchMock.mockClear()
    })

    //test block
    test("correct result is shown after input cycle profit and calculate commission correctly", () => {

        useSelectorMock.mockReturnValue(MOCK_DOWNLINES)
        // ARRANGE
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)
        /* SANITY CHECK */
        // expect(dummyDispatch).not.toHaveBeenCalled()

        render(<Calculator />);

        //select the elements you want to interact with
        const cycleProfitInput = screen.getByTestId("cycleProfitInput");
        const calculateBtn = screen.getByTestId("calculateBtn");
        const decimalPlaces3 = screen.getByTestId("decimalPlaces3");
        const currencyMYR = screen.getByTestId("currencyMYR");
        const commissionPayoutInput = screen.getByTestId("commissionPayoutInput");
        
        fireEvent.change(cycleProfitInput, {target: {value: 100}})
        fireEvent.change(commissionPayoutInput, {target: {value: 40}})
        fireEvent.click(decimalPlaces3);
        fireEvent.click(currencyMYR);
        
        //input MYR currency exchange rate
        const currencyMYRInput = screen.getByTestId("currencyMYRInput");
        fireEvent.change(currencyMYRInput, {target: {value: 4}})
        
        //interact with those elements
        fireEvent.click(calculateBtn);
        
        //check main acc profit
        const mainAccProfit = screen.getByTestId("mainAccProfit");
        
        //assert the expected result
        expect(mainAccProfit).toHaveTextContent("1200.000");
    });

    test("if no downlines, no row is rendered", () => {

        useSelectorMock.mockReturnValue([])
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)
    
        render(<Calculator />);
    
        //select the elements you want to interact with
        const cycleProfitInput = screen.getByTestId("cycleProfitInput");
        const calculateBtn = screen.getByTestId("calculateBtn");
        
        fireEvent.change(cycleProfitInput, {target: {value: 100}})
        
        //interact with those elements
        fireEvent.click(calculateBtn);

        //check downlines
        const downlinesRow = screen.queryByTestId("downlinesRow");
        
        //assert the expected result
        expect(downlinesRow).toBeNull();
    
      });

      test("if input cycle profit is not number, error is rendered", () => {

        useSelectorMock.mockReturnValue(MOCK_DOWNLINES)
        const dummyDispatch = jest.fn()
        useDispatchMock.mockReturnValue(dummyDispatch)
    
        render(<Calculator />);
    
        //select the elements you want to interact with
        const cycleProfitInput = screen.getByTestId("cycleProfitInput");
        const cycleProfitError = screen.getByTestId("cycleProfitError");
        
        // fireEvent.change(cycleProfitInput, {target: {value: -200}})
        fireEvent.keyUp(cycleProfitInput, {key: 'A', code: 'KeyA'})
        
        //interact with those elements
        expect(cycleProfitError).toHaveTextContent("Please input valid number");

    
      });
});



