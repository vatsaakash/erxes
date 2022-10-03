import { QRCodeSVG } from "qrcode.react";
import { useState } from "react";

import { IInvoice, IPaymentParams, ISocialPayResponse } from "../types";

type Props = {
  params: IPaymentParams;
  invoice?: IInvoice;
  onChange: (key: string, value: any) => void;
};

const SocialPaySection = (props: Props) => {
  const { invoice } = props;

  const response = invoice && (invoice.apiResponse as ISocialPayResponse);

  const renderInvoiceData = () => {
    if (!response || !response.text) {
      return null;
    }

    if (!response.text.includes("socialpay-payment")) {
      return (
        <div>
          <label className="label" htmlFor="response">
            {response.text}
          </label>
        </div>
      );
    }

    return (
      <>
        <div className="border">
          <div>
            <QRCodeSVG value={response.text} />
          </div>

          <div>
            <label className="labelSpecial centerStatus">
              Status: {invoice.status}
            </label>
          </div>
        </div>
      </>
    );
  };

  const renderInputs = () => {
    if (invoice){
      return null;
    }

    return (
      <div className='border'>
      <div style={{ marginBottom: '20px' }}>
        <label className='label' htmlFor='invoiceByPhone'>
          Create invoice with phone number:
        </label>
        <input
          type='checkbox'
          onClick={onChange}
          id='invoiceByPhone'
          name='invoiceByPhone'
          checked={invoiceByPhone}
        />
      </div>
      {invoiceByPhone && (
        <>
          <label className='label'>Phone number:</label>
          <input type='text' value={phone} onChange={onChange} id='phone' />
        </>
      )}
      <label className='label' htmlFor='amount'>
        Amount:{' '}
      </label>
      <input
        type='text'
        value={params.amount}
        onChange={onChange}
        disabled={true}
        name='amount'
        id='amount'
      />

      <label className='label' htmlFor='description'>
        Description:{' '}
      </label>
      <input
        type='text'
        value={params.description}
        onChange={onChange}
        name='description'
        id='description'
      />
    </div>
    )
  }

  return (
    <div style={{ overflow: 'auto' }}>
      {renderInvoiceData()}
    </div>
  );
};

export default SocialPaySection;
