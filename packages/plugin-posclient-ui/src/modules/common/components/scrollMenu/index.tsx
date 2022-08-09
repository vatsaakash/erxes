import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Element from './ScrollMenuElement';
import useDrag from './useDrag';
import { LeftArrow, RightArrow } from './arrows';
import { Container } from './styles';
import cn from 'classnames';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

function HorizontalScroll({ items, ItemComponent, className }) {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag = ({ scrollContainer }: scrollVisibilityApiType) => (
    ev: React.MouseEvent
  ) =>
    dragMove(ev, posDiff => {
      if (scrollContainer.current) {
        scrollContainer.current.scrollLeft += posDiff;
      }
    });

  return (
    <Container
      onMouseLeave={dragStop}
      className={cn('horizontal-scroll', className)}
    >
      <ScrollMenu
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
        {items.map(({ id }) => (
          <Element
            itemId={id} // NOTE: itemId is required for track items
            key={id}
          >
            <ItemComponent id={id} />
          </Element>
        ))}
      </ScrollMenu>
    </Container>
  );
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollPrev();
  } else if (ev.deltaY > 0) {
    apiObj.scrollNext();
  }
}

export default HorizontalScroll;
