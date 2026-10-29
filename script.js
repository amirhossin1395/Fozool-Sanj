// =========================================
// فضول سنج - اسکریپت کامل
// =========================================

document.addEventListener('DOMContentLoaded', () => {

    // ---------- عناصر ----------
    const nameBox = document.getElementById('nameBox');
    const nameInput = document.getElementById('nameInput');
    const nameBtn = document.getElementById('nameBtn');
    const scanSection = document.getElementById('scanSection');
    const greeting = document.getElementById('greeting');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const startBtn = document.getElementById('start-btn');
    const uploadBtn = document.getElementById('upload-btn');
    const fileInput = document.getElementById('file-input');
    const scanLine = document.getElementById('scan-line');
    const scanStatus = document.getElementById('scanStatus');
    const result = document.getElementById('result');
    const percentEl = document.getElementById('percent');
    const rankBadge = document.getElementById('rankBadge');
    const messageEl = document.getElementById('message');
    const funFactEl = document.getElementById('funFact');
    const resultEmoji = document.getElementById('resultEmoji');
    const retryBtn = document.getElementById('retry-btn');

    let userName = '';
    let currentPercent = 0;
    let currentRank = '';

    // ---------- ذرات پس‌زمینه ----------
    const particlesContainer = document.getElementById('particles');
    const colors = ['#10b981', '#34d399', '#6ee7b7', '#fbbf24', '#f472b6', '#60a5fa'];
    for (let i = 0; i < 30; i++) {
        const p = document.createElement('div');
        p.className = 'particle';
        const size = Math.random() * 25 + 8;
        p.style.width = size + 'px';
        p.style.height = size + 'px';
        p.style.background = colors[Math.floor(Math.random() * colors.length)];
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animationDelay = Math.random() * 15 + 's';
        p.style.animationDuration = (Math.random() * 10 + 12) + 's';
        particlesContainer.appendChild(p);
    }

    // ---------- رده‌بندی‌ها ----------
    const ranks = [
        {
            max: 14,
            name: 'اصلاً فضول نیست! 😇',
            emoji: '😇',
            color: '#10b981',
            messages: [
                'تو یه فرشته‌ی آرومی! به کار هیچ‌کس کاری نداری. 😊',
                'وای، تو چقدر خوبی! اصلاً تو زندگی بقیه سرک نمی‌کشی! 🌟',
                'یه الگوی خوب برای همه! حتی اگه درِ خونه باز باشه، نگاه نمی‌کنی! 🚪',
                'بهت افتخار می‌کنیم! تو نماد احترام به حریم خصوصی هستی! 🏆',
                'اصلاً کنجکاو نیستی؟ حتی یه ذره؟! باورت نمی‌شه! 🤯'
            ],
            facts: [
                'آدم‌های مثل تو معمولاً رازهای دیگران رو خیلی خوب نگه می‌دارن! 🤫',
                'افراد کم‌فضول، دوستان قابل‌اعتمادتری هستن! 💚',
                'تو از اون دسته آدمایی هستی که وقتی گوشی رو می‌ذارن رو میز، نگاهش نمی‌کنن! 📱'
            ]
        },
        {
            max: 28,
            name: 'خیلی کم فضوله! 😌',
            emoji: '😌',
            color: '#34d399',
            messages: [
                'تقریباً هیچ فضولی‌ای نداری! فقط گاهی یه نگاه کوچیک! 👀',
                'تو یه آدم آروم و محترمی! به ندرت کنجکاو می‌شی. ✨',
                'خیلی خوبی! فقط شاید یه بار در سال، اونم اتفاقی! 😄',
                'کم‌فضول بودن هنر می‌خواد، تو استادشی! 🎨',
                'بقیه باید ازت یاد بگیرن چطور به حریم خصوصی احترام بذارن! 👏'
            ],
            facts: [
                'آدم‌های کم‌فضول معمولاً آرامش بیشتری دارن! 🧘',
                'تو از اون دسته‌ای که وقتی پیام کسی رو می‌بینی، نمی‌خونی! 📵',
                'کم‌فضولی یه نشانه‌ی بلوغه! تو داری! 🌱'
            ]
        },
        {
            max: 42,
            name: 'کم فضوله! 🙂',
            emoji: '🙂',
            color: '#6ee7b7',
            messages: [
                'یه کم فضولی، ولی کاملاً قابل قبول! 😏',
                'تو مرزها رو می‌شناسی، فقط گاهی شیطونی می‌کنی! 😜',
                'فضولی تو در حد سالم و طبیعیه! هیچ مشکلی نیست. 👌',
                'بعضی وقتا کنجکاو می‌شی، ولی خودت رو کنترل می‌کنی! 💪',
                'نه خیلی خوب، نه خیلی بد! یه آدم معمولی و نرمال! 😄'
            ],
            facts: [
                'کنجکاوی سالم، موتور یادگیریه! تو داری ازش درست استفاده می‌کنی! 📚',
                'آدم‌های با فضولی متوسط، معمولاً خلاق‌ترن! 💡',
                'تو تعادل رو حفظ می‌کنی، این خیلی خوبه! ⚖️'
            ]
        },
        {
            max: 57,
            name: 'متوسط فضوله! 🤔',
            emoji: '🤔',
            color: '#fbbf24',
            messages: [
                'اوه، یه کم فضول شدی! مراقب باش! 😅',
                'تو یه آدم کنجکاوی! گاهی سوالایی می‌پرسی که کسی جوابشو نمی‌ده! 😂',
                'وسط راهی! نه خیلی خوب، نه خیلی بد! ولی حواست باشه! 👀',
                'کنجکاوی خوبه، ولی در حدش! تو داری از حد رد می‌شی! 😬',
                'فکر کنم یه بار گوشی دوستت رو چک کردی! اعتراف کن! 😜'
            ],
            facts: [
                'آدم‌های متوسط‌فضول، معمولاً بهترین خبرنگارا می‌شن! 📰',
                'کنجکاوی متوسط، باعث می‌شه چیزهای جدید یاد بگیری! 🌍',
                'ولی حواست باشه، کنجکاوی زیاد می‌تونه دردسر بسازه! ⚠️'
            ]
        },
        {
            max: 72,
            name: 'زیاد فضوله! 😏',
            emoji: '😏',
            color: '#f59e0b',
            messages: [
                'وای، تو دیگه خیلی فضولی! 😂 به کار بقیه چیکار داری؟',
                'حواست باشه، ممکنه یه روز گیر بیفتی! 🚨',
                'تو از اون دسته‌ای که وقتی دو نفر پچ‌پچ می‌کنن، گوششون رو تیز می‌کنی! 👂',
                'اعتراف کن! تا حالا چند بار گوشی بقیه رو نگاه کردی؟ 😜',
                'فضولی تو دیگه از حد گذشته! یه کم خودت رو کنترل کن! 🛑'
            ],
            facts: [
                'فضولی زیاد، می‌تونه به اعتماد بین دوستان ضربه بزنه! 💔',
                'آدم‌های زیادفضول، معمولاً رازهای دیگران رو زود لو می‌دن! 🗣️',
                'نکته: کنجکاوی رو به یادگیری تبدیل کن، نه به سرک کشیدن! 📖'
            ]
        },
        {
            max: 87,
            name: 'خیلی فضوله! 😱',
            emoji: '😱',
            color: '#ef4444',
            messages: [
                'یا خدا! تو دیگه کینگ فضولی! 👑😂',
                'بهت جایزه فضولی می‌دیم! 🏆 بیا بگیر!',
                'خدا به داد اطرافیانت برسه! 🤣',
                'تو از اون دسته‌ای که حتی پیام‌های خونده‌نشده بقیه رو هم چک می‌کنی! 📱',
                'فضولی تو دیگه یه بیماریه! برو دکتر! 😂🏥',
                'تو باید یه دوره «فضولی‌تراپی» بری! 🛋️'
            ],
            facts: [
                'فضولی زیاد، می‌تونه نشونه‌ی عدم اعتماد به خود باشه! 🧠',
                'آدم‌های خیلی فضول، معمولاً دوستان کمتری دارن! 👥',
                'پیشنهاد: به جای سرک کشیدن، روی خودت کار کن! 🌱'
            ]
        },
        {
            max: 100,
            name: 'فوق‌العاده فضوله! 🤯',
            emoji: '🤯',
            color: '#dc2626',
            messages: [
                'تو دیگه رکورددار فضولی هستی! گینس رو خبر کن! 🏆🤣',
                'تو از اون دسته‌ای که حتی دفتر خاطرات بقیه رو هم می‌خونی! 📔',
                'بهت لقب «فضول‌ترین آدم کهکشان» رو می‌دیم! 🌌',
                'حتی FBI هم ازت می‌ترسه! 🕵️‍♂️😂',
                'تو باید تحت نظارت باشی! 😂🚨',
                'فضولی تو دیگه به مرحله «ابر فضولی» رسیده! 🚀',
                'تو باید یه پاداش بگیری، ولی از نوع فضولی‌ش! 🎁😂'
            ],
            facts: [
                'فضولی در این حد، ممکنه باعث از دست دادن دوستان بشه! 💔',
                'پیشنهاد جدی: شاید بهتر باشه یه کم روی حریم خصوصی دیگران کار کنی! 🧘',
                'تو می‌تونی از این کنجکاوی برای یادگیری چیزهای جدید استفاده کنی! 📚✨'
            ]
        }
    ];

    // ---------- شروع با نام ----------
    nameBtn.addEventListener('click', () => {
        const name = nameInput.value.trim();
        if (name.length < 2) {
            nameInput.style.borderColor = '#ef4444';
            nameInput.placeholder = 'حداقل ۲ حرف بنویس! 😅';
            setTimeout(() => {
                nameInput.style.borderColor = '';
                nameInput.placeholder = 'مثلاً: امیرحسین';
            }, 2000);
            return;
        }
        userName = name;
        nameBox.style.display = 'none';
        scanSection.style.display = 'block';
        greeting.textContent = `سلام ${userName}! 👋 آماده‌ای؟`;
    });

    nameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') nameBtn.click();
    });

    // ---------- شروع دوربین ----------
    startBtn.addEventListener('click', async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            startScan();
        } catch (err) {
            scanStatus.textContent = 'دوربین باز نشد! 😅 اجازه بده!';
        }
    });

    // ---------- آپلود عکس ----------
    uploadBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            video.style.display = 'none';
            const img = new Image();
            img.src = ev.target.result;
            img.onload = () => {
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                startScan();
            };
        };
        reader.readAsDataURL(file);
    });

    // ---------- انیمیشن اسکن ----------
    function startScan() {
        scanLine.classList.add('active');
        scanStatus.textContent = 'در حال اسکن... 🔍';
        percentEl.textContent = '0%';
        result.style.display = 'none';

        let counter = 0;
        const interval = setInterval(() => {
            counter += 2;
            if (counter > 100) counter = 100;
            percentEl.textContent = counter + '%';
            if (counter >= 100) {
                clearInterval(interval);
                scanLine.classList.remove('active');
                scanStatus.textContent = 'اسکن کامل شد! ✅';
                setTimeout(showResult, 500);
            }
        }, 25);
    }

    // ---------- نمایش نتیجه ----------
    function showResult() {
        currentPercent = Math.floor(Math.random() * 100) + 1;
        const rank = ranks.find(r => currentPercent <= r.max) || ranks[ranks.length - 1];
        currentRank = rank.name;

        percentEl.textContent = currentPercent + '%';
        rankBadge.textContent = rank.name;
        rankBadge.style.background = `linear-gradient(135deg, ${rank.color}, ${rank.color}dd)`;
        resultEmoji.textContent = rank.emoji;

        messageEl.textContent = rank.messages[Math.floor(Math.random() * rank.messages.length)];
        funFactEl.textContent = rank.facts[Math.floor(Math.random() * rank.facts.length)];

        result.style.display = 'block';
        result.style.animation = 'none';
        setTimeout(() => {
            result.style.animation = 'zoomIn 0.6s cubic-bezier(0.68, -0.55, 0.27, 1.55)';
        }, 10);

        result.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // ---------- ساخت لینک نتیجه ----------
    function getShareUrl() {
        const params = new URLSearchParams({
            name: userName,
            percent: currentPercent,
            rank: currentRank
        });
        return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    }

    function getShareText() {
        return `🕵️ فضول سنج\n\n${userName} جان، نتیجه‌ت ${currentPercent}% فضولیه!\nرده‌بندی: ${currentRank}\n\nتو هم امتحان کن! 😂\n`;
    }

    // ---------- اشتراک‌گذاری بومی ----------
    document.getElementById('share-native').addEventListener('click', async () => {
        const text = getShareText();
        const url = getShareUrl();
        if (navigator.share) {
            try {
                await navigator.share({ title: 'فضول سنج', text, url });
            } catch (e) {}
        } else {
            navigator.clipboard.writeText(text + '\n' + url);
            alert('متن کپی شد! ✅ حالا برای دوستات بفرست! 😎');
        }
    });

    // ---------- واتساپ ----------
    document.getElementById('share-whatsapp').addEventListener('click', () => {
        const text = encodeURIComponent(getShareText() + getShareUrl());
        window.open(`https://wa.me/?text=${text}`, '_blank');
    });

    // ---------- تلگرام ----------
    document.getElementById('share-telegram').addEventListener('click', () => {
        const text = encodeURIComponent(getShareText());
        const url = encodeURIComponent(getShareUrl());
        window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    });

    // ---------- کپی لینک ----------
    document.getElementById('share-copy').addEventListener('click', () => {
        navigator.clipboard.writeText(getShareUrl()).then(() => {
            const btn = document.getElementById('share-copy');
            btn.textContent = '✅ کپی شد!';
            setTimeout(() => btn.textContent = '📋 کپی لینک', 2000);
        });
    });

    // ---------- دوباره ----------
    retryBtn.addEventListener('click', () => {
        result.style.display = 'none';
        percentEl.textContent = '0%';
        scanStatus.textContent = 'آماده اسکن... 📷';
        video.style.display = 'block';
    });

    // ---------- نمایش نتیجه از لینک اشتراک‌گذاری ----------
    const urlParams = new URLSearchParams(window.location.search);
    const sharedName = urlParams.get('name');
    const sharedPercent = urlParams.get('percent');
    const sharedRank = urlParams.get('rank');

    if (sharedName && sharedPercent && sharedRank) {
        nameBox.style.display = 'none';
        scanSection.style.display = 'none';

        userName = sharedName;
        currentPercent = parseInt(sharedPercent, 10);
        currentRank = sharedRank;

        percentEl.textContent = currentPercent + '%';
        rankBadge.textContent = currentRank;

        const rank = ranks.find(r => currentPercent <= r.max) || ranks[ranks.length - 1];
        rankBadge.style.background = `linear-gradient(135deg, ${rank.color}, ${rank.color}dd)`;
        resultEmoji.textContent = rank.emoji;

        messageEl.textContent = rank.messages[Math.floor(Math.random() * rank.messages.length)];
        funFactEl.textContent = rank.facts[Math.floor(Math.random() * rank.facts.length)];

        result.style.display = 'block';

        if (greeting) {
            greeting.textContent = `سلام ${userName}! 👋 این نتیجه‌ی فضولی توئه!`;
        }
    }

});
