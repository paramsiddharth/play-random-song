import { forwardRef, type ForwardedRef } from "react";

const Play = forwardRef(({
  pressed,
  press,
}: {
  pressed: boolean;
  press: () => void;
}, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} className='mx-auto flex max-w-sm h-full items-center justify-center'>
      <button
        disabled={pressed}
        className='pushable'
        onClick={() => press()}
      >
        <div className='front'>
          Play A Random
          <div>Param Siddharth</div>
          Song
        </div>
      </button>
    </div>
  );
});

export default Play;
