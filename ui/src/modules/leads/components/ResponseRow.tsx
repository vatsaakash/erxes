import dayjs from 'dayjs';
import Icon from 'modules/common/components/Icon';
import TextInfo from 'modules/common/components/TextInfo';
import { DateWrapper } from 'modules/common/styles/main';
import { IFormResponse } from 'modules/forms/types';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  formSubmission: IFormResponse;
  fieldIds: string[];
};

class ResponseRow extends React.Component<Props> {
  render() {
    const { formSubmission, fieldIds } = this.props;
    const submissions = formSubmission.submissions || [];

    const result: Array<{ formFieldId: string; value: any }> = [];

    for (const id of fieldIds) {
      const foundIndex = submissions.findIndex(e => e.formFieldId === id);
      if (foundIndex === -1) {
        result.push({ formFieldId: id, value: '-' });
      } else {
        result.push(submissions[foundIndex]);
      }
    }

    console.log(this.props.formSubmission);

    return (
      <tr>
        {result.map(e => {
          return (
            <td key={e.formFieldId}>
              <Link
                to={`/inbox/index?_id=${formSubmission.contentTypeId}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TextInfo ignoreTrans={true}>{e.value || '-'}</TextInfo>
              </Link>
            </td>
          );
        })}
        <td>
          <Icon icon="calender" />{' '}
          <DateWrapper>
            {dayjs(formSubmission.createdAt).format('YYYY MMM D, h:mm A')}
          </DateWrapper>
        </td>
      </tr>
    );
  }
}

export default ResponseRow;
