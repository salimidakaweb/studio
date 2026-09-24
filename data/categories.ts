/**
 * Category pages data (kids + wedding).
 *
 * Both pages share EXACTLY the same layout/components; only the content
 * changes. Everything the page renders (SEO meta, headings, copy, links,
 * plans, JSON-LD) comes from here, so both pages are fully server-rendered
 * and SEO friendly, and adding a third category later is just a new entry.
 *
 * Sub-service links (`services.items[].href`) point to /services/[slug]
 * whose content lives in data/services.ts (kids: existing 5 slugs,
 * wedding: added slugs).
 */

export type CategorySlug = "kids" | "wedding";

export type CategorySlide = {
    image: string;
    alt: string;
};

export type CategoryServiceItem = {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    href: string;
};

export type CategoryPlan = {
    /** Latin label shown above the title (e.g. "Essential"). */
    name: string;
    title: string;
    description: string;
    /** Display price, already localized (e.g. "۵"). Unit is "میلیون تومان". */
    price: string;
    featured?: boolean;
    features: string[];
};

export type CategoryPost = {
    title: string;
    category: string;
    date: string;
    image: string;
    href: string;
};

export type CategoryData = {
    slug: CategorySlug;
    /** Path of the page, used for canonical / breadcrumbs / JSON-LD. */
    path: string;
    /** Short human name, used in breadcrumbs and labels. */
    name: string;

    seo: {
        title: string;
        description: string;
        /** Absolute or root-relative OG image. */
        ogImage: string;
        keywords?: string[];
    };

    hero: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        description: string;
        primaryCta: { label: string; href: string };
        secondaryCta: { label: string; href: string };
        /** Photos shown one-by-one on the camera LCD. */
        slides: CategorySlide[];
    };

    services: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        description: string;
        items: CategoryServiceItem[];
    };

    about: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        paragraphs: string[];
        image: string;
        imageAlt: string;
        stats: { value: string; label: string }[];
        cta: { label: string; href: string };
    };

    portfolio: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        galleryHref: string;
        galleryLabel: string;
        items: {
            title: string;
            label: string;
            image: string;
            imageAlt: string;
            href: string;
            /** Tailwind grid placement classes (md+). */
            className: string;
        }[];
    };

    plans: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        note: string;
        items: CategoryPlan[];
    };

    booking: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        description: string;
        /** Options for the "نوع خدمات" chips in the form. */
        serviceOptions: string[];
    };

    blog: {
        eyebrow: string;
        title: string;
        titleAccent: string;
        viewAllHref: string;
        viewAllLabel: string;
        posts: CategoryPost[];
    };

    /** FAQ used for the FAQPage JSON-LD and (optionally) an on-page block. */
    jsonLd: {
        serviceType: string;
        offerNames: string[];
    };
};

export const categories: Record<CategorySlug, CategoryData> = {
    /* ------------------------------------------------------------------ */
    /*  KIDS                                                               */
    /* ------------------------------------------------------------------ */
    kids: {
        slug: "kids",
        path: "/kids",
        name: "آتلیه کودک",

        seo: {
            title: "آتلیه کودک بختیاری | عکاسی کودک، نوزاد و تولد در تهران",
            description:
                "آتلیه تخصصی عکاسی کودک بختیاری؛ عکاسی تولد، فضای باز، در منزل، فانتزی و بارداری با نور استودیویی و فضایی امن و آرام. مشاهده نمونه‌کارها، پکیج‌ها و رزرو نوبت.",
            ogImage: "/images/slides/sample-2.jpg",
            keywords: [
                "آتلیه کودک",
                "عکاسی کودک",
                "آتلیه تولد کودک",
                "عکاسی نوزاد",
                "آتلیه کودک در تهران",
            ],
        },

        hero: {
            eyebrow: "آتلیه کودک بختیاری",
            title: "لحظه‌های کودکی،",
            titleAccent: "برای همیشه ثبت می‌شوند",
            description:
                "عکاسی تخصصی کودک و نوزاد، با نور استودیویی و فضایی امن و آرام؛ خاطره‌ای که سال‌ها بعد هم لبخند به لب می‌آورد.",
            primaryCta: { label: "رزرو نوبت عکاسی", href: "#booking" },
            secondaryCta: { label: "مشاهده نمونه‌کارها", href: "#portfolio" },
            slides: [
                { image: "/images/slides/sample-1.jpg", alt: "نمونه‌کار عکاسی کودک در آتلیه بختیاری" },
                { image: "/images/slides/sample-2.jpg", alt: "عکاسی تولد کودک با دکور اختصاصی" },
                { image: "/images/slides/sample-3.jpg", alt: "پرتره کودک با نور استودیویی" },
            ],
        },

        services: {
            eyebrow: "KIDS STUDIO",
            title: "هر سبک،",
            titleAccent: "یک دنیای کودکانه.",
            description:
                "از جشن تولد و فضای باز تا عکس در منزل و فانتزی؛ سبک مناسب فرزندتان را انتخاب کنید.",
            items: [
                {
                    title: "آتلیه تولد کودک",
                    description: "جشنی که برای همیشه می‌ماند، با دکور و تم اختصاصی.",
                    image: "/images/slides/sample-2.jpg",
                    imageAlt: "عکاسی تولد کودک با دکور بادکنک در آتلیه بختیاری",
                    href: "/services/birthday",
                },
                {
                    title: "آتلیه فضای باز کودک",
                    description: "لحظه‌های طبیعی و پرتحرک در لوکیشن‌های زیبا.",
                    image: "/images/slides/sample-1.jpg",
                    imageAlt: "عکاسی فضای باز کودک در طبیعت",
                    href: "/services/outdoor-kids",
                },
                {
                    title: "آتلیه بارداری",
                    description: "ثبت زیبایی دوران انتظار، در فضایی آرام و صمیمی.",
                    image: "/images/slides/sample-3.jpg",
                    imageAlt: "عکاسی بارداری در آتلیه",
                    href: "/services/pregnancy",
                },
                {
                    title: "عکس در منزل کودک",
                    description: "قاب‌های واقعی و خودمانی در محیط آشنای خانه.",
                    image: "/images/slides/sample-2.jpg",
                    imageAlt: "عکاسی کودک در منزل",
                    href: "/services/home-kids",
                },
                {
                    title: "آتلیه فانتزی کودک",
                    description: "دنیای رؤیایی با لباس و دکور فانتزی.",
                    image: "/images/slides/sample-1.jpg",
                    imageAlt: "عکاسی فانتزی کودک با دکور تخیلی",
                    href: "/services/fantasy-kids",
                },
            ],
        },

        about: {
            eyebrow: "ABOUT KIDS ATELIER",
            title: "درباره‌ی آتلیه کودک",
            titleAccent: "بختیاری.",
            paragraphs: [
                "در آتلیه کودک بختیاری، هر جلسه‌ی عکاسی با بازی و آرامش شروع می‌شود؛ چون می‌دانیم بهترین قاب‌ها وقتی ثبت می‌شوند که کودک راحت است و از لحظه‌ها لذت می‌برد.",
                "عکاسان ما با تجربه‌ی کار با نوزاد و کودک، لحظه‌های طبیعی و صمیمی را بدون استرس ثبت می‌کنند و مجموعه‌ای از لباس، دکور و تم‌های متنوع برای سنین مختلف در اختیار شماست.",
            ],
            image: "/images/slides/sample-1.jpg",
            imageAlt: "نمایی از فضای آتلیه کودک بختیاری",
            stats: [
                { value: "15+", label: "سال تجربه" },
                { value: "2K+", label: "خاطره ثبت‌شده" },
            ],
            cta: { label: "مطالعه بیشتر", href: "/about" },
        },

        portfolio: {
            eyebrow: "KIDS PORTFOLIO",
            title: "نمونه‌کارهای",
            titleAccent: "آتلیه کودک.",
            galleryHref: "/gallery",
            galleryLabel: "مشاهده تمام نمونه‌کارها",
            items: [
                {
                    title: "تولد کودک",
                    label: "BIRTHDAY",
                    image: "/images/slides/sample-1.jpg",
                    imageAlt: "نمونه‌کار عکاسی تولد کودک",
                    href: "/services/birthday",
                    className: "md:col-start-1 md:row-start-1 md:row-span-2",
                },
                {
                    title: "فضای باز",
                    label: "OUTDOOR",
                    image: "/images/slides/sample-2.jpg",
                    imageAlt: "نمونه‌کار عکاسی فضای باز کودک",
                    href: "/services/outdoor-kids",
                    className: "md:col-start-2 md:row-start-1",
                },
                {
                    title: "بارداری",
                    label: "MATERNITY",
                    image: "/images/slides/sample-3.jpg",
                    imageAlt: "نمونه‌کار عکاسی بارداری",
                    href: "/services/pregnancy",
                    className: "md:col-start-3 md:row-start-1",
                },
                {
                    title: "عکس در منزل",
                    label: "AT HOME",
                    image: "/images/slides/sample-2.jpg",
                    imageAlt: "نمونه‌کار عکاسی کودک در منزل",
                    href: "/services/home-kids",
                    className: "md:col-start-2 md:row-start-2 md:col-span-2",
                },
                {
                    title: "فانتزی",
                    label: "FANTASY",
                    image: "/images/slides/sample-3.jpg",
                    imageAlt: "نمونه‌کار عکاسی فانتزی کودک",
                    href: "/services/fantasy-kids",
                    className: "md:col-start-4 md:row-start-1 md:row-span-2",
                },
            ],
        },

        plans: {
            eyebrow: "KIDS PACKAGES",
            title: "پکیج‌های عکاسی کودک،",
            titleAccent: "برای هر سن.",
            note:
                "* قیمت‌ها نمونه هستند و با توجه به سن کودک، تم و خدمات انتخابی قابل تغییر خواهند بود.",
            items: [
                {
                    name: "Mini",
                    title: "پکیج مینی",
                    description: "جلسه‌ای کوتاه و شیرین برای ثبت قاب‌های ساده.",
                    price: "۲",
                    features: ["۳۰ دقیقه عکاسی", "۱ تم و دکور", "۱۰ عکس ادیت‌شده", "تحویل دیجیتال"],
                },
                {
                    name: "Classic",
                    title: "پکیج کلاسیک",
                    description: "انتخابی کامل برای مجموعه‌ای متنوع از قاب‌های کودک.",
                    price: "۴",
                    featured: true,
                    features: [
                        "۱ ساعت عکاسی",
                        "۲ تم و دکور",
                        "۲۵ عکس ادیت‌شده",
                        "آلبوم اختصاصی",
                        "تحویل دیجیتال",
                    ],
                },
                {
                    name: "Party",
                    title: "پکیج جشن تولد",
                    description: "ثبت کامل جشن تولد، از دکور تا کیک اسماش.",
                    price: "۷",
                    features: [
                        "پوشش کامل جشن",
                        "عکاس + فیلم‌بردار",
                        "۴۰ عکس ادیت‌شده",
                        "کلیپ جشن تولد",
                        "آلبوم لوکس",
                    ],
                },
            ],
        },

        booking: {
            eyebrow: "BOOK A SESSION",
            title: "لحظه‌ی کودک شما،",
            titleAccent: "از همین‌جا شروع می‌شود.",
            description:
                "برای رزرو وقت عکاسی کودک یا دریافت مشاوره‌ی رایگان، فرم روبه‌رو را تکمیل کنید تا در اولین فرصت با شما تماس بگیریم.",
            serviceOptions: [
                "تولد کودک",
                "فضای باز",
                "بارداری",
                "عکس در منزل",
                "فانتزی",
            ],
        },

        blog: {
            eyebrow: "JOURNAL",
            title: "مقالاتی درباره‌ی",
            titleAccent: "عکاسی کودک.",
            viewAllHref: "/blog",
            viewAllLabel: "مشاهده همه مقالات",
            posts: [
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
                {
                    title: "عکاسی کودک در فضای باز",
                    category: "ایده و الهام",
                    date: "۰۲ شهریور ۱۴۰۵",
                    image: "/images/slides/sample-2.jpg",
                    href: "/blog",
                },
                {
                    title: "آتلیه عکاسی کودک در شرق تهران",
                    category: "راهنمای عکاسی",
                    date: "۰۹ شهریور ۱۴۰۵",
                    image: "/images/slides/sample-1.jpg",
                    href: "/blog",
                },
            ],
        },

        jsonLd: {
            serviceType: "عکاسی کودک",
            offerNames: [
                "آتلیه تولد کودک",
                "آتلیه فضای باز کودک",
                "آتلیه بارداری",
                "عکس در منزل کودک",
                "آتلیه فانتزی کودک",
            ],
        },
    },

    /* ------------------------------------------------------------------ */
    /*  WEDDING                                                            */
    /* ------------------------------------------------------------------ */
    wedding: {
        slug: "wedding",
        path: "/wedding",
        name: "آتلیه عروس و داماد",

        seo: {
            title: "آتلیه عروس و داماد بختیاری | عکاسی عروسی، عقد و فرمالیته در تهران",
            description:
                "آتلیه تخصصی عکاسی عروسی بختیاری؛ عکاسی عروس و داماد، عقد، فرمالیته و بله‌برون با نورپردازی حرفه‌ای و آلبوم ژورنالی. مشاهده نمونه‌کارها، پکیج‌ها و رزرو نوبت.",
            ogImage: "/images/slides/sample-1.jpg",
            keywords: [
                "آتلیه عروس و داماد",
                "عکاسی عروسی",
                "آتلیه عقد",
                "عکاسی فرمالیته",
                "آتلیه عروس در تهران",
            ],
        },

        hero: {
            eyebrow: "آتلیه عروس و داماد بختیاری",
            title: "روز عروسی شما،",
            titleAccent: "قاب‌هایی که تکرار نمی‌شوند",
            description:
                "عکاسی عروس و داماد، عقد و فرمالیته با نورپردازی حرفه‌ای و نگاهی هنرمندانه؛ روایتی سینمایی از روزی که همیشه در خاطرتان می‌ماند.",
            primaryCta: { label: "رزرو نوبت عکاسی", href: "#booking" },
            secondaryCta: { label: "مشاهده نمونه‌کارها", href: "#portfolio" },
            slides: [
                { image: "/images/slides/sample-1.jpg", alt: "نمونه‌کار عکاسی عروس و داماد در آتلیه بختیاری" },
                { image: "/images/slides/sample-3.jpg", alt: "عکاسی عقد با نورپردازی حرفه‌ای" },
                { image: "/images/slides/sample-2.jpg", alt: "پرتره فرمالیته عروس و داماد" },
            ],
        },

        services: {
            eyebrow: "WEDDING STUDIO",
            title: "هر مراسم،",
            titleAccent: "یک روایت خاص.",
            description:
                "از عکاسی عروس و داماد و عقد تا فرمالیته و بله‌برون؛ سبک مناسب مراسم خود را انتخاب کنید.",
            items: [
                {
                    title: "آتلیه عروس و داماد",
                    description: "پرتره‌های رمانتیک با نور استودیویی و دکور اختصاصی.",
                    image: "/images/slides/sample-1.jpg",
                    imageAlt: "عکاسی عروس و داماد در آتلیه بختیاری",
                    href: "/services/bride-groom",
                },
                {
                    title: "آتلیه عقد",
                    description: "قاب‌های گرم و صمیمی از سفره‌ی عقد و لحظه‌های خانوادگی.",
                    image: "/images/slides/sample-3.jpg",
                    imageAlt: "عکاسی مراسم عقد",
                    href: "/services/engagement-ceremony",
                },
                {
                    title: "عکاسی فرمالیته",
                    description: "عکاسی رسمی و شیک در لوکیشن‌های منتخب شهر.",
                    image: "/images/slides/sample-2.jpg",
                    imageAlt: "عکاسی فرمالیته عروس و داماد در فضای باز",
                    href: "/services/formality",
                },
                {
                    title: "آتلیه بله‌برون",
                    description: "ثبت لحظه‌های اولین قرار رسمی دو خانواده.",
                    image: "/images/slides/sample-1.jpg",
                    imageAlt: "عکاسی مراسم بله‌برون",
                    href: "/services/proposal",
                },
            ],
        },

        about: {
            eyebrow: "ABOUT WEDDING ATELIER",
            title: "درباره‌ی آتلیه عروس و داماد",
            titleAccent: "بختیاری.",
            paragraphs: [
                "در آتلیه عروس و داماد بختیاری، هر عکس بخشی از داستان شماست؛ داستانی که با نگاه هنرمندانه، نور درست و لحظه‌های واقعی روایت می‌شود.",
                "از مشاوره‌ی اولیه و انتخاب سبک و لوکیشن تا رتوش حرفه‌ای و طراحی آلبوم، همه‌ی مراحل را با دقت و در کنار شما پیش می‌بریم تا مجموعه‌ای ماندگار داشته باشید.",
            ],
            image: "/images/slides/sample-3.jpg",
            imageAlt: "نمایی از فضای آتلیه عروس و داماد بختیاری",
            stats: [
                { value: "12+", label: "سال تجربه" },
                { value: "800+", label: "زوج راضی" },
            ],
            cta: { label: "مطالعه بیشتر", href: "/about" },
        },

        portfolio: {
            eyebrow: "WEDDING PORTFOLIO",
            title: "نمونه‌کارهای",
            titleAccent: "آتلیه عروس و داماد.",
            galleryHref: "/gallery",
            galleryLabel: "مشاهده تمام نمونه‌کارها",
            items: [
                {
                    title: "عروس و داماد",
                    label: "BRIDE & GROOM",
                    image: "/images/slides/sample-1.jpg",
                    imageAlt: "نمونه‌کار عکاسی عروس و داماد",
                    href: "/services/bride-groom",
                    className: "md:col-start-1 md:row-start-1 md:row-span-2",
                },
                {
                    title: "عقد",
                    label: "CEREMONY",
                    image: "/images/slides/sample-3.jpg",
                    imageAlt: "نمونه‌کار عکاسی عقد",
                    href: "/services/engagement-ceremony",
                    className: "md:col-start-2 md:row-start-1",
                },
                {
                    title: "فرمالیته",
                    label: "FORMALITY",
                    image: "/images/slides/sample-2.jpg",
                    imageAlt: "نمونه‌کار عکاسی فرمالیته",
                    href: "/services/formality",
                    className: "md:col-start-3 md:row-start-1",
                },
                {
                    title: "بله‌برون",
                    label: "PROPOSAL",
                    image: "/images/slides/sample-1.jpg",
                    imageAlt: "نمونه‌کار عکاسی بله‌برون",
                    href: "/services/proposal",
                    className: "md:col-start-2 md:row-start-2 md:col-span-2",
                },
                {
                    title: "لحظه‌های خانوادگی",
                    label: "FAMILY",
                    image: "/images/slides/sample-3.jpg",
                    imageAlt: "نمونه‌کار عکاسی خانوادگی در مراسم عروسی",
                    href: "/gallery",
                    className: "md:col-start-4 md:row-start-1 md:row-span-2",
                },
            ],
        },

        plans: {
            eyebrow: "WEDDING PACKAGES",
            title: "پکیج‌های عکاسی عروسی،",
            titleAccent: "برای هر مراسم.",
            note:
                "* قیمت‌ها نمونه هستند و با توجه به نوع مراسم، لوکیشن و خدمات انتخابی قابل تغییر خواهند بود.",
            items: [
                {
                    name: "Essential",
                    title: "پکیج آتلیه‌ای",
                    description: "عکاسی عروس و داماد در آتلیه با نور و دکور اختصاصی.",
                    price: "۸",
                    features: [
                        "۲ ساعت عکاسی در آتلیه",
                        "۱ عکاس",
                        "۳۰ عکس ادیت‌شده",
                        "تحویل دیجیتال",
                    ],
                },
                {
                    name: "Signature",
                    title: "پکیج آتلیه + فرمالیته",
                    description: "ترکیبی از عکاسی آتلیه و لوکیشن برای مجموعه‌ای کامل‌تر.",
                    price: "۱۸",
                    featured: true,
                    features: [
                        "۴ ساعت عکاسی",
                        "۲ عکاس",
                        "۶۰ عکس ادیت‌شده",
                        "آلبوم ژورنالی",
                        "تحویل دیجیتال",
                    ],
                },
                {
                    name: "Premium",
                    title: "پکیج کامل عروسی",
                    description: "پوشش کامل مراسم، از آتلیه تا جشن و فیلم سینمایی.",
                    price: "۳۵",
                    features: [
                        "پوشش کامل مراسم",
                        "۲ عکاس + فیلم‌بردار",
                        "۱۰۰ عکس ادیت‌شده",
                        "آلبوم لوکس",
                        "فیلم سینمایی",
                    ],
                },
            ],
        },

        booking: {
            eyebrow: "BOOK A SESSION",
            title: "روز عروسی شما،",
            titleAccent: "از همین‌جا شروع می‌شود.",
            description:
                "برای رزرو وقت عکاسی عروس و داماد یا دریافت مشاوره‌ی رایگان، فرم روبه‌رو را تکمیل کنید تا در اولین فرصت با شما تماس بگیریم.",
            serviceOptions: [
                "عروس و داماد",
                "عقد",
                "فرمالیته",
                "بله‌برون",
                "فیلم‌برداری",
            ],
        },

        blog: {
            eyebrow: "JOURNAL",
            title: "مقالاتی درباره‌ی",
            titleAccent: "عکاسی عروسی.",
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
                    title: "انتخاب لوکیشن مناسب برای عکاسی فرمالیته",
                    category: "ایده و الهام",
                    date: "۲۸ مرداد ۱۴۰۵",
                    image: "/images/slides/sample-3.jpg",
                    href: "/blog",
                },
                {
                    title: "چرا نور مهم‌ترین عنصر در یک عکس حرفه‌ای است؟",
                    category: "آموزش",
                    date: "۰۵ شهریور ۱۴۰۵",
                    image: "/images/slides/sample-2.jpg",
                    href: "/blog",
                },
            ],
        },

        jsonLd: {
            serviceType: "عکاسی عروسی",
            offerNames: [
                "آتلیه عروس و داماد",
                "آتلیه عقد",
                "عکاسی فرمالیته",
                "آتلیه بله‌برون",
            ],
        },
    },
};

export function getCategory(slug: CategorySlug): CategoryData {
    return categories[slug];
}
