//rem
(function () {
    // eslint-disable-next-line no-debugger
    let orientation = window.matchMedia("(orientation: portrait)");
    // eslint-disable-next-line no-unused-vars
    let width = document.documentElement.getBoundingClientRect().width; //获取宽度
    function onMatchMeidaChange(orientation) {
      if (orientation.matches) {
        // 竖屏
        width = document.documentElement.getBoundingClientRect().width; //获取竖屏宽度
        setTimeout(() => {
          // 重新计算竖屏宽度rem
          autoRootFontSize()
        });
      } else {
        // 横屏
        width = document.documentElement.getBoundingClientRect().width; //获取横屏宽度
        setTimeout(() => {
          // 重新计算横屏宽度rem
          autoRootFontSize()
        });
      }
    }
    onMatchMeidaChange(orientation);
    orientation.addListener(onMatchMeidaChange);

    /* 计算rem */
    function autoRootFontSize() {
      //(当前屏幕宽度，最小宽度为1200)/1920*16px
      let setSize = Math.max(document.documentElement.getBoundingClientRect().width,720) / 1920 * 16;
      //字体默认最大值为16px
      document.documentElement.style.fontSize = (setSize > 16 ? 16 : setSize) + 'px';
    }
    window.addEventListener('resize', autoRootFontSize);
    autoRootFontSize();
  })();