/**
 * Home (landing) page data. The home page is a simple hub that sends visitors
 * to the two category pages (/kids, /wedding), so every heading, link, alt
 * text and SEO field lives here and is rendered on the server.
 */

export type HomeData = {
    seo: {
        title: string;
        description: string;
        ogImage: string;
        keywords: string[];
    };

    slider: {
        /** The page's single <h1>. */
        title: string;
        subtitle: string;
        slides: {
            image: string;
            alt: string;
            /** Small label shown on the slide. */
            caption: string;
            href: string;
        }[];
        primaryCta: { label: string; href: string };
        secondaryCta: { label: string; href: string };
    };

    categories: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        description: string;
        items: {
            title: string;
            description: string;
            image: string;
            imageAlt: string;
            href: string;
            cta: string;
        }[];
    };

    video: {
        title: string;
        description: string;
        /** Optional real file. Without it only the poster + label are shown. */
        src?: string;
        poster: string;
        posterAlt: string;
    };

    about: {
        eyebrow: string;
        title: string;
        description: string;
        cta: { label: string; href: string };
    };

    blog: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        viewAllHref: string;
        viewAllLabel: string;
        posts: {
            title: string;
            category: string;
            date: string;
            image: string;
            href: string;
        }[];
    };
};

export const home: HomeData = {
    seo: {
        title: "آتلیه بختیاری | آتلیه کودک و عروس و داماد در تهران",
        description:
            "آتلیه بختیاری؛ عکاسی تخصصی کودک و نوزاد، عروس و داماد، عقد و فرمالیته با نور استودیویی و فضایی آرام. مشاهده نمونه‌کارها، پکیج‌ها و رزرو نوبت.",
        ogImage: "/images/slides/sample-1.jpg",
        keywords: [
            "آتلیه بختیاری",
            "آتلیه کودک",
            "آتلیه عروس و داماد",
            "عکاسی عروسی",
            "عکاسی کودک",
        ],
    },

    slider: {
        title: "آتلیه بختیاری؛ ثبت لحظه‌های ماندگار کودک و عروسی",
        subtitle:
            "عکاسی تخصصی کودک و نوزاد، عروس و داماد، عقد و فرمالیته با نور استودیویی و فضایی آرام.",
        slides: [
            {
                image: "/images/slides/sample-1.jpg",
                alt: "عکاسی عروس و داماد در آتلیه بختیاری",
                caption: "آتلیه عروس و داماد",
                href: "/wedding",
            },
            {
                image: "/images/slides/sample-2.jpg",
                alt: "عکاسی کودک با دکور اختصاصی در آتلیه بختیاری",
                caption: "آتلیه کودک",
                href: "/kids",
            },
            {
                image: "/images/slides/sample-3.jpg",
                alt: "عکاسی عقد و فرمالیته با نورپردازی حرفه‌ای",
                caption: "عقد و فرمالیته",
                href: "/wedding",
            },
        ],
        primaryCta: { label: "آتلیه کودک", href: "/kids" },
        secondaryCta: { label: "آتلیه عروس و داماد", href: "/wedding" },
    },

    categories: {
        eyebrow: "OUR STUDIOS",
        title: "برای هر لحظه،",
        titleAccent: "یک آتلیه.",
        description:
            "حال‌وهوای مناسب خودتان را انتخاب کنید؛ هر بخش تیم، دکور و پکیج‌های مخصوص به خود را دارد.",
        items: [
            {
                title: "عروسی",
                description: "عکاسی عروس و داماد، عقد، فرمالیته و بله‌برون.",
                image: "/images/slides/sample-1.jpg",
                imageAlt: "آتلیه عروس و داماد بختیاری",
                href: "/wedding",
                cta: "ورود به آتلیه عروسی",
            },
            {
                title: "کودک",
                description: "عکاسی تولد، نوزاد، فضای باز، در منزل و فانتزی.",
                image: "/images/slides/sample-2.jpg",
                imageAlt: "آتلیه کودک بختیاری",
                href: "/kids",
                cta: "ورود به آتلیه کودک",
            },
        ],
    },

    video: {
        title: "ویدیو آتلیه",
        description: "نگاهی کوتاه به فضای آتلیه و روند یک جلسه‌ی عکاسی.",
        poster: "/images/slides/sample-3.jpg",
        posterAlt: "ویدیوی معرفی آتلیه بختیاری",
    },

    about: {
        eyebrow: "ABOUT ATELIER",
        title: "درباره آتلیه بختیاری",
        description:
            "آتلیه بختیاری با بیش از ۱۵ سال تجربه، لحظه‌های خاص شما را با نگاهی هنرمندانه و نورپردازی حرفه‌ای ثبت می‌کند؛ از اولین قاب‌های کودکی تا روز عروسی.",
        cta: { label: "مطالعه بیشتر", href: "/about" },
    },

    blog: {
        eyebrow: "JOURNAL",
        title: "از دنیای",
        titleAccent: "آتلیه بختیاری.",
        viewAllHref: "/blog",
        viewAllLabel: "مشاهده همه مقالات",
        posts: [
            {
                title: "چطور برای عکاسی عروسی آماده شویم؟",
                category: "راهنمای عکاسی",
                date: "۱۲ شهریور ۱۴۰۵",
                image: "/images/slides/sample-1.jpg",
                href: "/blog",
            },
            {
                title: "چرا نور مهم‌ترین عنصر در یک عکس حرفه‌ای است؟",
                category: "آموزش",
                date: "۰۵ شهریور ۱۴۰۵",
                image: "/images/slides/sample-2.jpg",
                href: "/blog",
            },
            {
                title: "انتخاب لوکیشن مناسب برای عکاسی فرمالیته",
                category: "ایده و الهام",
                date: "۲۸ مرداد ۱۴۰۵",
                image: "/images/slides/sample-3.jpg",
                href: "/blog",
            },
            {
                title: "راهنمای کامل عکاسی کودک در آتلیه",
                category: "راهنمای عکاسی",
                date: "۲۰ مرداد ۱۴۰۵",
                image: "/images/slides/sample-1.jpg",
                href: "/blog",
            },
            {
                title: "چیدمان و دکور مناسب برای جشن تولد",
                category: "ایده و الهام",
                date: "۱۴ مرداد ۱۴۰۵",
                image: "/images/slides/sample-3.jpg",
                href: "/blog",
            },
        ],
    },
};
