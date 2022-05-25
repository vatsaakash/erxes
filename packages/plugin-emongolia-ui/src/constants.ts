export const TYPES = [
  {
    label: 'Иргэний үнэмлэхний мэдээлэл',
    serviceName: 'WS100101_getCitizenIDCardInfo',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Иргэний төрсний гэрчилгээний мэдээлэл',
    serviceName: 'WS100102_getCitizenBirthInfo',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Иргэний хаягийн мэдээлэл ',
    serviceName: 'WS100103_getCitizenAddressInfo',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Иргэн гэрлэлтийн мэдээлэл',
    serviceName: 'WS100104_getCitizenMarriageInfo',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Иргэн гэрлэлт цуцалсан тухай мэдээлэл ',
    serviceName: 'WS100105_getCitizenMarriageDivorceInfo',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Иргэнийг хурууны хээгээр баталгаажуулах сервис',
    serviceName: 'WS100106_authorizeCitizen',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Иргэний мэдээлэл тулгах сервис',
    serviceName: 'WS100107_checkCitizenInfo',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Иргэний регистрийн дугаар үнэн эсэхийг шалгах сервис',
    serviceName: 'WS100125_checkCitizenRegnum',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Гэрлэлт бүртгэлгүй тухай мэдээлэл',
    serviceName: 'WS100128_getCitizenNoMarriegeInfo',
    wdsl: 'https://xyp.gov.mn/citizen-1.3.0/ws?WSDL',
    type: 'citizen'
  },
  {
    label: 'Үл хөдлөх хөрөнгийн мэдээлэл',
    serviceName: 'WS100201_getPropertyInfo',
    wsdl: 'https://xyp.gov.mn/property-1.3.0/ws?WSDL',
    type: 'property'
  },
  {
    label: 'Үл хөдлөх хөрөнгийн жагсаалт',
    serviceName: 'WS100202_getPropertyList',
    wsdl: 'https://xyp.gov.mn/property-1.3.0/ws?WSDL',
    type: 'property'
  },
  {
    label: 'Хуулийн этгээдийн мэдээлэл ',
    serviceName: 'WS100307_getLegalEntityInfoWithRegnum',
    wsdl: 'https://xyp.gov.mn/legal-entity-1.3.0/ws?WSDL',
    type: 'legal-entity'
  },
  {
    label: 'Тээврийн хэрэгслийн мэдээлэл ',
    serviceName: 'WS100401_getVehicleInfo',
    wsdl: 'https://xyp.gov.mn/transport-1.3.0/ws?WSDL',
    type: 'transport'
  },
  {
    label: 'Тээврийн хэрэгслийн эзэмшигчийн түүхчилсэн мэдээлэл ',
    serviceName: 'WS100402_getVehicleOwnerHistoryList',
    wsdl: 'https://xyp.gov.mn/transport-1.3.0/ws?WSDL',
    type: 'transport'
  },
  {
    label: 'Тээврийн хэрэгслийн торгуулийн мэдээлэл',
    serviceName: 'WS100403_getVehiclePenaltyList',
    wsdl: 'https://xyp.gov.mn/transport-1.3.0/ws?WSDL',
    type: 'transport'
  },
  {
    label: 'Иргэний тээврийн хэрэгслийн мэдээлэл',
    serviceName: 'WS100406_getCitizenVehicleList',
    wsdl: 'https://xyp.gov.mn/transport-1.3.0/ws?WSDL',
    type: 'transport'
  },
  {
    label: 'Иргэний тээврийн хэрэгслийн мэдээлэл ',
    serviceName: 'WS100407_getDriverLicenseInfo',
    wsdl: 'https://xyp.gov.mn/transport-1.3.0/ws?WSDL',
    type: 'transport'
  },
  {
    label: 'Иргэний нийгмийн даатгалын мэдээлэл',
    serviceName: 'WS100501_getCitizenSalaryInfo',
    wsdl: 'https://xyp.gov.mn/insurance-1.3.0/ws?WSDL',
    type: 'insurance'
  },
  {
    label: 'Тэтгэврийн лавлагааны мэдээлэл',
    serviceName: 'WS100502_getCitizenPensionInquiry',
    wsdl: 'https://xyp.gov.mn/insurance-1.3.0/ws?WSDL',
    type: 'insurance'
  },
  {
    label: 'Татвар төлөгчийн мэдээлэл ',
    serviceName: 'WS100601_getTaxPayerInfo',
    wsdl: 'https://xyp.gov.mn/tax-1.3.0/ws?WSDL',
    type: 'tax'
  },
  {
    label: 'Тээврийн хэрэгслийн төлбөр төлсөн нэхэмжлэлийн түүх',
    serviceName: 'WS100609_getVehiclePaidTaxHistory',
    wsdl: 'https://xyp.gov.mn/tax-1.3.0/ws?WSDL',
    type: 'tax'
  },
  {
    label: 'Тээврийн хэрэгслийн төлөх ёстой нэхэмжлэлийн мэдэээлэл',
    serviceName: 'WS100610_getVehicleTaxPayableInfo',
    wsdl: 'https://xyp.gov.mn/tax-1.3.0/ws?WSDL',
    type: 'tax'
  },
  {
    label: 'Тээврийн хэрэгслийн мэдээлэл',
    serviceName: 'WS100611_getVehicleInfo',
    wsdl: 'https://xyp.gov.mn/tax-1.3.0/ws?WSDL',
    type: 'tax'
  }
];
