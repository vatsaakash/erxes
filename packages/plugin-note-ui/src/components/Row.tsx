import ActionButtons from '@erxes/ui/src/components/ActionButtons';
import ModalTrigger from '@erxes/ui/src/components/ModalTrigger';
import Form from './Form';
import React from 'react';
import Button from '@erxes/ui/src/components/Button';
import Tip from '@erxes/ui/src/components/Tip';
import Icon from '@erxes/ui/src/components/Icon';
import styled from 'styled-components';
import styledTS from 'styled-components-ts';
import { INote, IType } from '../types';
import { IButtonMutateProps } from '@erxes/ui/src/types';
import { __ } from '@erxes/ui/src/utils';
import { FormControl } from '@erxes/ui/src/components/form';
import { colors, dimensions } from '@erxes/ui/src/styles';

const NoteNameStyled = styledTS<{ checked: boolean }>(styled.div).attrs({})`
    color: ${colors.colorCoreBlack};
    text-decoration: ${props => (props.checked ? 'line-through' : 'none')}
    `;

export const NoteWrapper = styledTS<{ space: number }>(
  styled.div
)`padding-left: ${props => props.space * 20}px;
  display:inline-flex;
  justify-content:flex-start;
  align-items: center;
`;

const Margin = styledTS(styled.div)`
 margin: ${dimensions.unitSpacing}px;
`;

type Props = {
  note: INote;
  space: number;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  notes: INote[];
  remove: (note: INote) => void;
  edit: (note: INote) => void;
  types?: IType[];
};

type State = {
  checked: boolean;
};

class Row extends React.Component<Props, State> {
  Notes({ note, checked }) {
    return <NoteNameStyled checked={checked}>{note.name}</NoteNameStyled>;
  }

  removeNote = () => {
    const { remove, note } = this.props;

    remove(note);
  };

  toggleCheck = () => {
    const { edit, note } = this.props;

    edit({ _id: note._id, checked: !note.checked });
  };

  render() {
    const { note, renderButton, space, notes, types } = this.props;

    const editTrigger = (
      <Button btnStyle="link">
        <Tip text={__('Edit')} placement="top">
          <Icon icon="edit-3"></Icon>
        </Tip>
      </Button>
    );

    const content = props => (
      <Form
        {...props}
        types={types}
        note={note}
        renderButton={renderButton}
        notes={notes}
      />
    );

    const extractDate = note.expiryDate
      ? note.expiryDate?.toString().split('T')[0]
      : '-';

    return (
      <tr>
        <td>
          <NoteWrapper space={space}>
            <FormControl
              componentClass="checkbox"
              onChange={this.toggleCheck}
              color={colors.colorPrimary}
              defaultChecked={note.checked || false}
            ></FormControl>
            <Margin>
              <this.Notes note={note} checked={note.checked || false} />
            </Margin>
          </NoteWrapper>
        </td>
        <td>{extractDate}</td>
        <td>
          <ActionButtons>
            <ModalTrigger
              title="Edit note"
              trigger={editTrigger}
              content={content}
            />

            <Tip text={__('Delete')} placement="top">
              <Button
                btnStyle="link"
                onClick={this.removeNote}
                icon="times-circle"
              />
            </Tip>
          </ActionButtons>
        </td>
      </tr>
    );
  }
}

export default Row;
