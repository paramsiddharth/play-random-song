const Play = ({
  pressed,
  setPressed,
}: {
  pressed: boolean;
  setPressed: (pressed: boolean) => void;
}) => {
  return (
    <div className='mx-auto flex max-w-sm h-full items-center justify-center'>
      <button
        disabled={pressed}
        className='pushable'
        onClick={() => setPressed(true)}
      >
        <div className='front'>
          Play A Random
          <div>Param Siddharth</div>
          Song
        </div>
      </button>
    </div>
  );
};

export default Play;
