"use client";

import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";
import Image from "next/image";

const AUTOPLAY_MS = 6000;
const SWIPE_FRACTION = 0.1;
const SETTLE_MS = 450;

type Direction = "next" | "prev" | null;

type Slide = {
  image: string;
  alt: string;
};

export default function HomeSliderClient({
  slides,
  labels,
}: {
  slides: Slide[];
  labels: string[];
}) {
  const count = slides.length;

  const [index, setIndex] = useState(0);

  const [paused, setPaused] = useState(false);

  const [dragX, setDragX] = useState(0);

  const [dragging, setDragging] = useState(false);

  const [settling, setSettling] = useState(false);

  const [direction, setDirection] =
    useState<Direction>(null);

  const [transition, setTransition] =
    useState(false);

  const rootRef =
    useRef<HTMLDivElement>(null);

  const pointerIdRef =
    useRef<number | null>(null);

  const startXRef =
    useRef(0);

  const widthRef =
    useRef(1);

  /*
   * ---------------------------------------------------------
   * INDEXES
   * ---------------------------------------------------------
   */

  const prevIndex =
    (index - 1 + count) % count;

  const nextIndex =
    (index + 1) % count;

  /*
   * ---------------------------------------------------------
   * AUTOPLAY
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (
      paused ||
      dragging ||
      settling ||
      count < 2
    ) {
      return;
    }

    const timer =
      window.setInterval(() => {
        setTransition(true);

        setIndex((current) => {
          return (
            (current + 1) % count
          );
        });
      }, AUTOPLAY_MS);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    paused,
    dragging,
    settling,
    count,
  ]);

  /*
   * ---------------------------------------------------------
   * WIDTH
   * ---------------------------------------------------------
   */

  function measureWidth() {
    widthRef.current =
      rootRef.current?.clientWidth || 1;
  }

  /*
   * ---------------------------------------------------------
   * NAVIGATION
   * ---------------------------------------------------------
   */

  function goTo(target: number) {
    if (
      dragging ||
      settling ||
      count < 2
    ) {
      return;
    }

    setTransition(true);

    setIndex(
      (target + count) % count
    );
  }

  /*
   * ---------------------------------------------------------
   * POINTER DOWN
   * ---------------------------------------------------------
   */

  function handlePointerDown(
    e: PointerEvent<HTMLDivElement>
  ) {
    if (
      count < 2 ||
      settling
    ) {
      return;
    }

    const target =
      e.target as HTMLElement;

    if (
      target.closest("button")
    ) {
      return;
    }

    measureWidth();

    pointerIdRef.current =
      e.pointerId;

    startXRef.current =
      e.clientX;

    setTransition(false);

    setDragX(0);

    setDragging(true);

    setPaused(true);

    e.currentTarget.setPointerCapture(
      e.pointerId
    );
  }

  /*
   * ---------------------------------------------------------
   * POINTER MOVE
   * ---------------------------------------------------------
   */

  function handlePointerMove(
    e: PointerEvent<HTMLDivElement>
  ) {
    if (
      !dragging ||
      pointerIdRef.current !== e.pointerId
    ) {
      return;
    }

    const delta =
      e.clientX -
      startXRef.current;

    setDragX(delta);
  }

  /*
   * ---------------------------------------------------------
   * POINTER UP
   * ---------------------------------------------------------
   */

  function handlePointerUp(
    e: PointerEvent<HTMLDivElement>
  ) {
    if (
      !dragging ||
      pointerIdRef.current !== e.pointerId
    ) {
      return;
    }

    /*
     * خیلی مهم:
     *
     * از state یعنی dragX استفاده نمی‌کنیم.
     * مقدار واقعی Pointer را مستقیم می‌گیریم.
     */

    const delta =
      e.clientX -
      startXRef.current;

    const width =
      widthRef.current || 1;

    pointerIdRef.current = null;

    setDragging(false);

    /*
     * -------------------------------------------------------
     * SWIPE NOT ENOUGH
     * -------------------------------------------------------
     */

    if (
      Math.abs(delta) <
      width * SWIPE_FRACTION
    ) {
      setTransition(true);

      setDragX(0);

      setPaused(false);

      return;
    }

    /*
     * -------------------------------------------------------
     * NEXT
     * -------------------------------------------------------
     */

    if (delta < 0) {
      setDirection("next");

      setSettling(true);

      setTransition(true);

      setDragX(-width);

      return;
    }

    /*
     * -------------------------------------------------------
     * PREVIOUS
     * -------------------------------------------------------
     */

    setDirection("prev");

    setSettling(true);

    setTransition(true);

    setDragX(width);
  }

  /*
   * ---------------------------------------------------------
   * POINTER CANCEL
   * ---------------------------------------------------------
   */

  function handlePointerCancel(
    e: PointerEvent<HTMLDivElement>
  ) {
    if (
      pointerIdRef.current !==
      e.pointerId
    ) {
      return;
    }

    pointerIdRef.current = null;

    setDragging(false);

    setSettling(false);

    setDirection(null);

    setTransition(true);

    setDragX(0);

    setPaused(false);
  }

  /*
   * ---------------------------------------------------------
   * TRANSITION END
   * ---------------------------------------------------------
   */

  function handleTransitionEnd(
    e: React.TransitionEvent<HTMLDivElement>
  ) {
    /*
     * فقط transform مهم است.
     */

    if (
      e.propertyName !== "transform"
    ) {
      return;
    }

    if (
      !settling ||
      !direction
    ) {
      return;
    }

    /*
     * -------------------------------------------------------
     * نکته اصلی اصلاح:
     *
     * index را عوض می‌کنیم و بلافاصله
     * transition را خاموش می‌کنیم.
     *
     * بنابراین کاربر هیچ فریم اضافی
     * از تعویض پنل نمی‌بیند.
     * -------------------------------------------------------
     */

    const newIndex =
      direction === "next"
        ? (index + 1) % count
        : (index - 1 + count) % count;

    setTransition(false);

    setIndex(newIndex);

    setDragX(0);

    setSettling(false);

    setDirection(null);

    /*
     * یک frame صبر می‌کنیم تا layout جدید
     * commit شود؛ بعد transition را دوباره
     * فعال می‌کنیم.
     */

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTransition(true);

        setPaused(false);
      });
    });
  }

  /*
   * ---------------------------------------------------------
   * DRAG %
   * ---------------------------------------------------------
   */

  const dragPercent =
    (dragX /
      (widthRef.current || 1)) *
    100;

  /*
   * ---------------------------------------------------------
   * PANELS
   *
   * سه پنل ثابت:
   *
   * prev
   * active
   * next
   *
   * ---------------------------------------------------------
   */

  const panels = [
    {
      role: "prev" as const,
      slide:
        slides[prevIndex],
      position: -1,
    },

    {
      role: "active" as const,
      slide:
        slides[index],
      position: 0,
    },

    {
      role: "next" as const,
      slide:
        slides[nextIndex],
      position: 1,
    },
  ];

  return (
    <div
      ref={rootRef}
      className="
        relative
        h-[70svh]
        min-h-[440px]
        w-full
        touch-pan-y
        select-none
        overflow-hidden
        bg-[#0F1B22]
        lg:h-[78svh]
      "
      onPointerDown={
        handlePointerDown
      }
      onPointerMove={
        handlePointerMove
      }
      onPointerUp={
        handlePointerUp
      }
      onPointerCancel={
        handlePointerCancel
      }
      onMouseEnter={() =>
        setPaused(true)
      }
      onMouseLeave={() => {
        if (
          !dragging &&
          !settling
        ) {
          setPaused(false);
        }
      }}
      style={{
        cursor:
          count > 1
            ? dragging
              ? "grabbing"
              : "grab"
            : undefined,
      }}
    >
      {/*
       * =====================================================
       * SLIDES
       * =====================================================
       */}

      {panels.map(
        ({
          role,
          slide,
          position,
        }) => {
          const x =
            position * 100 +
            dragPercent;

          return (
            <div
              key={role}
              aria-hidden={
                role !== "active"
              }
              className="
                absolute
                inset-0
                overflow-hidden
              "
              style={{
                transform:
                  `translate3d(${x}%, 0, 0)`,

                transition: transition
                  ? `transform ${SETTLE_MS}ms cubic-bezier(0.22, 1, 0.36, 1)`
                  : "none",

                willChange:
                  "transform",

                zIndex:
                  role === "active"
                    ? 2
                    : 1,
              }}
              onTransitionEnd={
                role === "active"
                  ? handleTransitionEnd
                  : undefined
              }
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority
                sizes="100vw"
                draggable={false}
                className="
                  pointer-events-none
                  object-cover
                "
              />
            </div>
          );
        }
      )}

      {/*
       * =====================================================
       * ARROWS
       * =====================================================
       */}

      {count > 1 && (
        <>
          <button
            type="button"
            onClick={() =>
              goTo(index + 1)
            }
            aria-label="اسلاید بعدی"
            className="
              absolute
              left-4
              top-1/2
              z-20
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/25
              bg-black/20
              text-white
              backdrop-blur-sm
              transition
              hover:bg-white/15
              sm:flex
            "
          >
            ←
          </button>

          <button
            type="button"
            onClick={() =>
              goTo(index - 1)
            }
            aria-label="اسلاید قبلی"
            className="
              absolute
              right-4
              top-1/2
              z-20
              hidden
              h-11
              w-11
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              border
              border-white/25
              bg-black/20
              text-white
              backdrop-blur-sm
              transition
              hover:bg-white/15
              sm:flex
            "
          >
            →
          </button>

          {/*
           * =================================================
           * DOTS
           * =================================================
           */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-5
              z-20
              flex
              justify-center
              gap-2
            "
          >
            {labels.map(
              (label, i) => (
                <button
                  key={`${label}-${i}`}
                  type="button"
                  onClick={() =>
                    goTo(i)
                  }
                  aria-label={`نمایش اسلاید ${i + 1}`}
                  aria-current={
                    i === index
                  }
                  className={`
                    pointer-events-auto
                    h-1.5
                    rounded-full
                    transition-all
                    duration-300

                    ${
                      i === index
                        ? "w-6 bg-white"
                        : "w-1.5 bg-white/40 hover:bg-white/70"
                    }
                  `}
                />
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}