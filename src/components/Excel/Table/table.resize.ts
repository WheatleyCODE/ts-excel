import {
  ResizeType,
  RESIZER_MARGIN,
  MIN_COL_WIDTH,
  MIN_ROW_HEIGHT,
  IResizeTableOptions
} from '@types';
import { WQuery } from '@wquery';

export function resizeHandler(resizeType: string, $resizer: WQuery, $root: WQuery) {
  return new Promise<IResizeTableOptions>((res) => {
    const $parent = $resizer.getParent('[data-type="resizable"]');
    if (!$parent) return;

    let delta = 0;
    const coords = $parent.coords;
    const sideProp = resizeType === ResizeType.ROW ? 'bottom' : 'right';
    $parent.addClass(`${resizeType}-resizing`);

    const clearEvents = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      $parent.removeClass(`${resizeType}-resizing`);
    };

    const resizerStylesPreventDefault = () => {
      $resizer.css({
        top: 'auto',
        left: 'auto',
        [sideProp]: '-3px'
      });
    };

    if (resizeType === ResizeType.COL) {
      const $cells = $root.findAll(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = (e: MouseEvent) => {
        delta = e.pageX - coords.right;
        $resizer.css({
          left: coords.width + delta - RESIZER_MARGIN + 'px'
        });
      };

      document.onmouseup = () => {
        const resizeUp = (num: number) => {
          $parent.css({
            width: num + 'px'
          });

          $cells.forEach(($cell) => {
            $cell.css({
              width: num + 'px'
            });
          });

          res({ type: 'col', id: $parent.data.col || '', value: num });
        };

        if (-delta > coords.width - MIN_COL_WIDTH && delta < 0) {
          resizeUp(MIN_COL_WIDTH);
        } else {
          resizeUp(coords.width + delta);
        }

        clearEvents();
        resizerStylesPreventDefault();
      };
    }

    if (resizeType === ResizeType.ROW) {
      document.onmousemove = (e: MouseEvent) => {
        delta = e.clientY - coords.bottom;
        $resizer.css({
          top: coords.height + delta - RESIZER_MARGIN + 'px'
        });
      };

      document.onmouseup = () => {
        const resizeUp = (num: number) => {
          $parent.css({
            height: num + 'px'
          });

          res({ type: 'row', id: $parent.data.row || '', value: num });
        };

        if (-delta > coords.height - MIN_ROW_HEIGHT && delta < 0) {
          resizeUp(MIN_ROW_HEIGHT);
        } else {
          resizeUp(coords.height + delta);
        }

        clearEvents();
        resizerStylesPreventDefault();
      };
    }
  });
}
