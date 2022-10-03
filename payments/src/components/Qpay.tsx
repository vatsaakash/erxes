import { QRCodeSVG } from "qrcode.react";

import { IInvoice, IPaymentParams, IQpayResponse } from "../types";

type Props = {
  params: IPaymentParams;
  invoice?: IInvoice;
  onChange: (key: string, value: any) => void;
};

const QpaySection = (props: Props) => {
  const { params, invoice } = props;
  // const [deleteMutation] = useMutation(gql(mutations.branchesRemove));
  console.log("invoice", invoice)

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
      return <iframe src="https://qpay.mn/q/?q=0002010102121531279404962794049600221010012938027430014A00000084300010108TDBMMNUB02094560764445204739253034965402105802MN5913ENEMEMEIKHKHK6011Ulaanbaatar625401175bFYRqujrMr9PR3TK0504test0721O3Pc0Ng-Lbv8VJXskNldp78150178345157354267902228002016304449A"/>
    }

    return (
      <>
        <div className="border">
          <h4 style={{ marginTop: 0 }}>Scan QR code below:</h4>
          {invoice.qrText && (
          // {qpayResponse && (
          //   <div>
          //     <QRCodeSVG value={qpayResponse.qr_text} />
          //   </div>
          )}
        </div>
      </>
    );
  };

  const onChange = (e: any) => {
    props.onChange(e.target.id, e.target.value);
  };

  return (
    <div style={{ overflow: "auto" }}>
      {renderQR()}

      {invoice && invoice.qrText ? null : (
        <div className="border">
          <div>
            <label className="label" htmlFor="amount">
              Amount:{" "}
            </label>
            <input
              type="text"
              value={params.amount}
              onChange={(e) => onChange(e)}
              name="amount"
              id="amount"
              disabled={true}
            />
            <label className="label" htmlFor="description">
              Description:{" "}
            </label>
            <input
              type="text"
              value={params.description}
              onChange={(e) => onChange(e)}
              name="description"
              id="description"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default QpaySection;
