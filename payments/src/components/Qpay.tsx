import { QRCodeSVG } from "qrcode.react";

import { IInvoice, IPaymentParams, IQpayResponse } from "../types";

type Props = {
  params: IPaymentParams;
  invoice?: IInvoice;
  onChange: (key: string, value: any) => void;
};

const QpaySection = (props: Props) => {
  const { params, invoice } = props;
  console.log("invoice", invoice);

  const qpayResponse = invoice && (invoice.apiResponse as IQpayResponse);

  const renderQR = () => {
    if (!invoice) {
      return null;
    }

    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i,
    ];
    let mobile = toMatch.some((toMatchItem) => {
      return navigator.userAgent.match(toMatchItem);
    });

    if (mobile) {
      return (
        <iframe src="https://qpay.mn/q/?q=0002010102121531279404962794049600221010012938027430014A00000084300010108TDBMMNUB02094560764445204739253034965402105802MN5913ENEMEMEIKHKHK6011Ulaanbaatar625401175bFYRqujrMr9PR3TK0504test0721O3Pc0Ng-Lbv8VJXskNldp78150178345157354267902228002016304449A" />
      );
    }

    return (
      <>
        <label className="label">QR code: </label>
        <div className="border">
          {qpayResponse && (
            <div>
              <QRCodeSVG value={qpayResponse.qr_text} />
            </div>
          )}
          <div>
            <label className="labelSpecial" htmlFor="qpay">
              Status: {invoice && invoice.status}
            </label>
          </div>
        </div>
      </>
    );
  };

  const onChange = (e: any) => {
    props.onChange(e.target.id, e.target.value);
  };

  return <div style={{ overflow: "auto" }}>{renderQR()}</div>;
};

export default QpaySection;
