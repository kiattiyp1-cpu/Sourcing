
const FlyerTrackApp = (() => {
    const STORAGE_KEYS = {
        records: 'flyerTrack.records',
        formats: 'flyerTrack.formats',
        activity: 'flyerTrack.activity',
        session: 'flyerTrack.session',
        language: 'flyerTrack.language'
    };

    const BRANCHES = [
        { id: 'bangkok', name: 'Bangkok Central', color: '#2563eb', center: [13.7563, 100.5018] },
        { id: 'chiangmai', name: 'Chiang Mai North', color: '#0ea5e9', center: [18.7883, 98.9853] },
        { id: 'phuket', name: 'Phuket Coast', color: '#22d3ee', center: [7.8804, 98.3923] },
        { id: 'yangon', name: 'Yangon Hub', color: '#6366f1', center: [16.8409, 96.1735] }
    ];

    const CUSTOMER_TYPES = [
        { id: 'project', i18n: { en: 'Project', th: 'โครงการ', my: 'စီမံကိန်း' } },
        { id: 'home-owner', i18n: { en: 'Home Owner / Shop Owner', th: 'เจ้าของบ้าน / เจ้าของร้าน', my: 'အိမ်ပိုင်ရှင် / ဆိုင်ပိုင်ရှင်' } },
        { id: 'existing-member', i18n: { en: 'Existing Member', th: 'สมาชิกปัจจุบัน', my: 'လက်ရှိအဖွဲ့ဝင်' } },
        { id: 'contractor', i18n: { en: 'Contractor', th: 'ผู้รับเหมา', my: 'တည်ဆောက်လုပ်ငန်းခန့်' } },
        { id: 'factory-company', i18n: { en: 'Factory / Company', th: 'โรงงาน / บริษัท', my: 'စက်ရုံ / ကုမ္ပဏီ' } },
        { id: 'monastery', i18n: { en: 'Monastery', th: 'วัด / สถานปฏิบัติธรรม', my: 'ဗိမာန်/ဘုန်းတော်ကြီးကျောင်း' } }
    ];

    const translations = {
        en: {
            welcomeTitle: 'Welcome to FlyerTrack',
            welcomeSubtitle: 'Select your role to continue.',
            adminRole: 'Administrator',
            branchRole: 'Branch User',
            selectBranch: 'Select branch',
            continue: 'Continue',
            appTitle: 'FlyerTrack Dashboard',
            appSubtitle: 'Smart flyer distribution monitoring',
            logout: 'Logout',
            navDashboard: 'Dashboard',
            navRecords: 'Records',
            navFormats: 'Data Formats',
            statTotalFlyers: 'Total Flyers',
            statActiveBranches: 'Active Branches',
            statInteractions: 'Customer Interactions',
            statPhotos: 'Photos Captured',
            mapTitle: 'Distribution Map',
            chartTitle: 'Flyers by Branch',
            refresh: 'Refresh',
            quickActions: 'Quick Actions',
            addDistribution: 'Add Distribution Record',
            exportExcel: 'Export Records to Excel',
            manageFormats: 'Manage Data Formats',
            exportFormat: 'Export',
            recentActivity: 'Recent Activity',
            recordsTitle: 'Distribution Records',
            recordsSubtitle: 'Monitor and manage all flyer drops',
            filterBranch: 'Branch',
            filterCustomerType: 'Customer Type',
            filterDate: 'Date',
            clearFilters: 'Clear',
            allBranches: 'All branches',
            allTypes: 'All',
            tableDate: 'Date',
            tableBranch: 'Branch',
            tableAgent: 'Agent',
            tableFlyers: 'Flyers',
            tableInteractions: 'Interactions',
            tableCustomerType: 'Customer Type',
            tableLocation: 'Location',
            tablePhoto: 'Photo',
            tableActions: 'Actions',
            formatsTitle: 'Data Format Management',
            formatsSubtitle: 'Control export formats and standards',
            addFormat: 'New Format',
            exportFormats: 'Export All Formats',
            formatStatsTotal: 'Total Formats',
            formatStatsActive: 'Active Formats',
            formatStatsExport: 'Excel Ready Formats',
            formatTableName: 'Name',
            formatTableType: 'Type',
            formatTableStatus: 'Status',
            formatTableOptions: 'Options',
            formatTableActions: 'Actions',
            recordModalTitle: 'Distribution Record',
            recordModalSubtitle: 'Capture flyer drop details',
            fieldDate: 'Date',
            fieldBranch: 'Branch',
            fieldAgent: 'Agent',
            fieldFlyers: 'Number of Flyers',
            fieldInteractions: 'Customer Interactions',
            fieldCustomerType: 'Customer Type',
            fieldLocation: 'Location',
            fieldLatitude: 'Latitude',
            fieldLongitude: 'Longitude',
            fieldNotes: 'Notes',
            fieldPhoto: 'Photo Capture',
            photoHint: 'Use your phone camera to capture the distribution point',
            locationAction: 'Use current location',
            locationFetching: 'Capturing GPS signal…',
            locationReady: 'Ready to capture GPS location from your device',
            locationSuccess: 'Location captured from your device',
            locationLoaded: 'Existing record location loaded',
            locationError: 'Unable to capture location. Please try again.',
            locationPermission: 'Location permission denied. Enable GPS to continue.',
            locationUnavailable: 'Device location is unavailable in this browser.',
            locationToastSuccess: 'GPS location captured',
            cancel: 'Cancel',
            saveRecord: 'Save Record',
            formatModalTitle: 'Data Format',
            formatModalSubtitle: 'Configure export formatting rules',
            formatFieldName: 'Format Name',
            formatFieldType: 'Format Type',
            formatFieldDescription: 'Description',
            formatOptionHeaders: 'Include headers',
            formatOptionMetadata: 'Include metadata',
            formatOptionAuto: 'Auto export enabled',
            formatFieldStatus: 'Status',
            statusActive: 'Active',
            statusInactive: 'Inactive',
            saveFormat: 'Save Format',
            roleAdmin: 'Administrator',
            roleBranch: branch => `Branch · ${branch}`,
            noPhoto: 'No photo',
            viewPhoto: 'Preview',
            edit: 'Edit',
            remove: 'Delete',
            confirmDeleteRecord: 'Delete this record?',
            confirmDeleteFormat: 'Delete this data format?',
            activity_record_created: branch => `New record logged for ${branch}`,
            activity_record_updated: branch => `Record updated for ${branch}`,
            activity_record_deleted: branch => `Record deleted from ${branch}`,
            activity_format_created: name => `Format "${name}" created`,
            activity_format_updated: name => `Format "${name}" updated`,
            activity_format_deleted: name => `Format "${name}" removed`,
            activity_empty: 'No activity yet',
            branchOnlyNotice: 'Your branch is preselected for this record.',
            validationPhoto: 'Photo preview ready',
            exportSuccess: 'Excel exported',
            exportFormatSuccess: 'Format export complete',
            noData: 'No data available',
            timeAgoJustNow: 'Just now',
            timeAgoMinutes: (n) => `${n}m ago`,
            timeAgoHours: (n) => `${n}h ago`,
            timeAgoDays: (n) => `${n}d ago`,
            formatOptionsLabel: (headers, metadata, auto) => {
                const opts = [];
                if (headers) opts.push('Headers');
                if (metadata) opts.push('Metadata');
                if (auto) opts.push('Auto-export');
                return opts.length ? opts.join(', ') : '—';
            }
        },
        th: {
            welcomeTitle: 'ยินดีต้อนรับสู่ FlyerTrack',
            welcomeSubtitle: 'เลือกบทบาทเพื่อเข้าสู่ระบบ',
            adminRole: 'ผู้ดูแลระบบ',
            branchRole: 'ผู้ใช้สาขา',
            selectBranch: 'เลือกสาขา',
            continue: 'ดำเนินการต่อ',
            appTitle: 'แดชบอร์ด FlyerTrack',
            appSubtitle: 'ระบบติดตามการแจกแผ่นพับอัจฉริยะ',
            logout: 'ออกจากระบบ',
            navDashboard: 'แดชบอร์ด',
            navRecords: 'บันทึก',
            navFormats: 'รูปแบบข้อมูล',
            statTotalFlyers: 'จำนวนแผ่นพับ',
            statActiveBranches: 'สาขาที่ใช้งาน',
            statInteractions: 'จำนวนการพบลูกค้า',
            statPhotos: 'รูปถ่ายที่บันทึก',
            mapTitle: 'แผนที่การแจก',
            chartTitle: 'แผ่นพับตามสาขา',
            refresh: 'รีเฟรช',
            quickActions: 'เมนูลัด',
            addDistribution: 'เพิ่มบันทึกการแจก',
            exportExcel: 'ส่งออกบันทึกเป็น Excel',
            manageFormats: 'จัดการรูปแบบข้อมูล',
            exportFormat: 'ส่งออก',
            recentActivity: 'กิจกรรมล่าสุด',
            recordsTitle: 'บันทึกการแจก',
            recordsSubtitle: 'ติดตามและจัดการการแจกทั้งหมด',
            filterBranch: 'สาขา',
            filterCustomerType: 'ประเภทลูกค้า',
            filterDate: 'วันที่',
            clearFilters: 'ล้างค่า',
            allBranches: 'ทุกสาขา',
            allTypes: 'ทั้งหมด',
            tableDate: 'วันที่',
            tableBranch: 'สาขา',
            tableAgent: 'ผู้แจก',
            tableFlyers: 'แผ่นพับ',
            tableInteractions: 'การพบลูกค้า',
            tableCustomerType: 'ประเภทลูกค้า',
            tableLocation: 'พิกัด',
            tablePhoto: 'รูปถ่าย',
            tableActions: 'การจัดการ',
            formatsTitle: 'การจัดการรูปแบบข้อมูล',
            formatsSubtitle: 'ควบคุมรูปแบบการส่งออกและมาตรฐาน',
            addFormat: 'เพิ่มรูปแบบ',
            exportFormats: 'ส่งออกรูปแบบทั้งหมด',
            formatStatsTotal: 'จำนวนรูปแบบทั้งหมด',
            formatStatsActive: 'รูปแบบที่ใช้งาน',
            formatStatsExport: 'รูปแบบพร้อม Excel',
            formatTableName: 'ชื่อ',
            formatTableType: 'ประเภท',
            formatTableStatus: 'สถานะ',
            formatTableOptions: 'ตัวเลือก',
            formatTableActions: 'การจัดการ',
            recordModalTitle: 'บันทึกการแจก',
            recordModalSubtitle: 'บันทึกรายละเอียดการแจกแผ่นพับ',
            fieldDate: 'วันที่',
            fieldBranch: 'สาขา',
            fieldAgent: 'ผู้แจก',
            fieldFlyers: 'จำนวนแผ่นพับ',
            fieldInteractions: 'จำนวนการพบลูกค้า',
            fieldCustomerType: 'ประเภทลูกค้า',
            fieldLocation: 'ตำแหน่งพิกัด',
            fieldLatitude: 'ละติจูด',
            fieldLongitude: 'ลองจิจูด',
            fieldNotes: 'หมายเหตุ',
            fieldPhoto: 'บันทึกรูปถ่าย',
            photoHint: 'ใช้กล้องบนมือถือถ่ายจุดที่แจก',
            locationAction: 'ใช้พิกัดปัจจุบัน',
            locationFetching: 'กำลังจับสัญญาณ GPS…',
            locationReady: 'พร้อมจับพิกัดจากอุปกรณ์ของคุณ',
            locationSuccess: 'ดึงพิกัดจากอุปกรณ์เรียบร้อยแล้ว',
            locationLoaded: 'โหลดพิกัดจากบันทึกเดิมแล้ว',
            locationError: 'ไม่สามารถดึงพิกัดได้ โปรดลองอีกครั้ง',
            locationPermission: 'ไม่ได้รับสิทธิ์พิกัด กรุณาเปิดใช้งาน GPS',
            locationUnavailable: 'อุปกรณ์นี้ไม่รองรับการระบุตำแหน่งในเบราว์เซอร์นี้',
            locationToastSuccess: 'บันทึกพิกัด GPS แล้ว',
            cancel: 'ยกเลิก',
            saveRecord: 'บันทึกข้อมูล',
            formatModalTitle: 'รูปแบบข้อมูล',
            formatModalSubtitle: 'กำหนดกฎการจัดรูปแบบการส่งออก',
            formatFieldName: 'ชื่อรูปแบบ',
            formatFieldType: 'ประเภทรูปแบบ',
            formatFieldDescription: 'คำอธิบาย',
            formatOptionHeaders: 'รวมส่วนหัว',
            formatOptionMetadata: 'รวมข้อมูลเมตา',
            formatOptionAuto: 'เปิดใช้งานส่งออกอัตโนมัติ',
            formatFieldStatus: 'สถานะ',
            statusActive: 'ใช้งาน',
            statusInactive: 'ไม่ใช้งาน',
            saveFormat: 'บันทึกรูปแบบ',
            roleAdmin: 'ผู้ดูแลระบบ',
            roleBranch: branch => `สาขา · ${branch}`,
            noPhoto: 'ไม่มีรูป',
            viewPhoto: 'แสดง',
            edit: 'แก้ไข',
            remove: 'ลบ',
            confirmDeleteRecord: 'ต้องการลบบันทึกนี้หรือไม่?',
            confirmDeleteFormat: 'ต้องการลบรูปแบบข้อมูลนี้หรือไม่?',
            activity_record_created: branch => `เพิ่มบันทึกใหม่ให้สาขา ${branch}`,
            activity_record_updated: branch => `อัปเดตบันทึกของสาขา ${branch}`,
            activity_record_deleted: branch => `ลบบันทึกของสาขา ${branch}`,
            activity_format_created: name => `สร้างรูปแบบ "${name}"`,
            activity_format_updated: name => `อัปเดตรูปแบบ "${name}"`,
            activity_format_deleted: name => `ลบรูปแบบ "${name}"`,
            activity_empty: 'ยังไม่มีกิจกรรม',
            branchOnlyNotice: 'ระบบกำหนดสาขาของคุณให้อัตโนมัติ',
            validationPhoto: 'เตรียมแสดงตัวอย่างรูปแล้ว',
            exportSuccess: 'ส่งออก Excel แล้ว',
            exportFormatSuccess: 'ส่งออกรูปแบบเรียบร้อย',
            noData: 'ไม่พบข้อมูล',
            timeAgoJustNow: 'เมื่อสักครู่',
            timeAgoMinutes: (n) => `${n} นาทีที่แล้ว`,
            timeAgoHours: (n) => `${n} ชั่วโมงที่แล้ว`,
            timeAgoDays: (n) => `${n} วันที่แล้ว`,
            formatOptionsLabel: (headers, metadata, auto) => {
                const opts = [];
                if (headers) opts.push('ส่วนหัว');
                if (metadata) opts.push('ข้อมูลเมตา');
                if (auto) opts.push('ส่งออกอัตโนมัติ');
                return opts.length ? opts.join(', ') : '—';
            }
        },
        my: {
            welcomeTitle: 'FlyerTrack သို့ ကြိုဆိုပါတယ်',
            welcomeSubtitle: 'ဆက်သွယ်ရန် တာဝန်ခံအဆင့်ကို ရွေးချယ်ပါ',
            adminRole: 'အုပ်ချုပ်သူ',
            branchRole: 'ရှေ့နေရုံးအသုံးပြုသူ',
            selectBranch: 'အရံကို ရွေးချယ်ပါ',
            continue: 'ဆက်လုပ်ရန်',
            appTitle: 'FlyerTrack ဒက်ရှ်ဘုတ်',
            appSubtitle: 'အခြေပြုကြော်ငြာပွတ်ပိုစီဆန့်ကျင်ရေး စောင့်ကြည့်မှု',
            logout: 'ထွက်မည်',
            navDashboard: 'ဒက်ရှ်ဘုတ်',
            navRecords: 'မှတ်တမ်းများ',
            navFormats: 'ဒေတာဖော်မက်များ',
            statTotalFlyers: 'ကြော်ငြာစာရွက်စုစုပေါင်း',
            statActiveBranches: 'သက်ဆိုင်ရာရုံးများ',
            statInteractions: 'ဖောက်သည်တွေ့ဆုံမှု',
            statPhotos: 'ဓာတ်ပုံများ',
            mapTitle: 'ဖြန့်ချိရာမြေပုံ',
            chartTitle: 'ရုံးလိုက်ကြော်ငြာစာရွက်',
            refresh: 'ပြန်လည်ထပ်တင်',
            quickActions: 'လျင်မြန်ချက်များ',
            addDistribution: 'ဖြန့်ချိမှတ်တမ်းထည့်မည်',
            exportExcel: 'Excel သို့ တင်မည်',
            manageFormats: 'ဒေတာဖော်မတ်များကို စီမံမည်',
            exportFormat: 'တင်ပို့',
            recentActivity: 'လတ်တလော လှုပ်ရှားမှု',
            recordsTitle: 'ဖြန့်ချိမှတ်တမ်းများ',
            recordsSubtitle: 'ဖြန့်ချိမှုအားလုံးကိုစောင့်ကြည့်ထိန်းချုပ်ပါ',
            filterBranch: 'ရုံးခွဲ',
            filterCustomerType: 'ဖောက်သည် အမျိုးအစား',
            filterDate: 'ရက်စွဲ',
            clearFilters: 'ဖျက်သိမ်း',
            allBranches: 'ရုံးခွဲများအားလုံး',
            allTypes: 'အားလုံး',
            tableDate: 'ရက်စွဲ',
            tableBranch: 'ရုံးခွဲ',
            tableAgent: 'ဝန်ထမ်း',
            tableFlyers: 'ကြော်ငြာစာရွက်',
            tableInteractions: 'တွေ့ဆုံမှု',
            tableCustomerType: 'ဖောက်သည် အမျိုးအစား',
            tableLocation: 'နေရာ',
            tablePhoto: 'ဓာတ်ပုံ',
            tableActions: 'လုပ်ဆောင်ချက်',
            formatsTitle: 'ဒေတာဖော်မတ် စီမံခန့်ခွဲမှု',
            formatsSubtitle: 'ထုတ်ယူဖော်မတ်နှင့် စံနှုန်းများကိုထိန်းချုပ်ပါ',
            addFormat: 'ဖော်မတ်အသစ်',
            exportFormats: 'ဖော်မတ်များအားလုံးထုတ်ယူ',
            formatStatsTotal: 'ဖော်မတ်စုစုပေါင်း',
            formatStatsActive: 'အသုံးပြုနေသော ဖော်မတ်',
            formatStatsExport: 'Excel အတွက် ပြင်ဆင်ပြီး',
            formatTableName: 'အမည်',
            formatTableType: 'အမျိုးအစား',
            formatTableStatus: 'အခြေအနေ',
            formatTableOptions: 'ရွေးချယ်စရာ',
            formatTableActions: 'လုပ်ဆောင်ချက်',
            recordModalTitle: 'ဖြန့်ချိမှတ်တမ်း',
            recordModalSubtitle: 'ကြော်ငြာစာရွက်ဖြန့်ချိမှုအသေးစိတ်ကို မှတ်သားပါ',
            fieldDate: 'ရက်စွဲ',
            fieldBranch: 'ရုံးခွဲ',
            fieldAgent: 'ဝန်ထမ်း',
            fieldFlyers: 'ကြော်ငြာစာရွက် အရေအတွက်',
            fieldInteractions: 'တွေ့ဆုံမှု အရေအတွက်',
            fieldCustomerType: 'ဖောက်သည် အမျိုးအစား',
            fieldLocation: 'တည်နေရာ',
            fieldLatitude: 'လတ္တီကျု',
            fieldLongitude: 'လောင်ဂျီကျု',
            fieldNotes: 'မှတ်စု',
            fieldPhoto: 'ဓာတ်ပုံ ကွန်ယက်',
            photoHint: 'ဖိုင်ယာဖြန့်ချိရာနေရာကို ဖုန်းကင်မရာဖြင့် ဓာတ်ပုံရိုက်ပါ',
            locationAction: 'လက်ရှိတည်နေရာယူမည်',
            locationFetching: 'GPS ကို ရယူနေပါသည်…',
            locationReady: 'သင့်စက်ပစ္စည်းမှ GPS တည်နေရာယူရန်အတွက် အဆင်သင့်ဖြစ်ပါသည်',
            locationSuccess: 'သင့်စက်ပစ္စည်းမှ တည်နေရာကို ရယူပြီးပါပြီ',
            locationLoaded: 'ယခင်မှတ်တမ်းရှိ တည်နေရာကို တင်သွင်းထားပါသည်',
            locationError: 'တည်နေရာရယူရန် မအောင်မြင်ပါ။ ထပ်မံကြိုးစားပါ',
            locationPermission: 'တည်နေရာခွင့်ပြုချက် လိုအပ်ပါသည်။ GPS ကို ဖွင့်ပေးပါ',
            locationUnavailable: 'ဤဘရောက်ဇာတွင် စက်ပစ္စည်းတည်နေရာ မရရှိနိုင်ပါ',
            locationToastSuccess: 'GPS တည်နေရာကို သိမ်းဆည်းပြီးပါပြီ',
            cancel: 'ပယ်ဖျက်',
            saveRecord: 'မှတ်တမ်းသိမ်းမည်',
            formatModalTitle: 'ဒေတာဖော်မတ်',
            formatModalSubtitle: 'ထုတ်ယူရေးဥပဒေများကို ပြင်ဆင်ပါ',
            formatFieldName: 'ဖော်မတ်အမည်',
            formatFieldType: 'ဖော်မတ် အမျိုးအစား',
            formatFieldDescription: 'ဖော်ပြချက်',
            formatOptionHeaders: 'ခေါင်းစီးများ ထည့်သွင်း',
            formatOptionMetadata: 'မီတာဒေတာ ထည့်သွင်း',
            formatOptionAuto: 'Auto export ဖွင့်',
            formatFieldStatus: 'အခြေအနေ',
            statusActive: 'အသုံးပြု中',
            statusInactive: 'ပိတ်ထား',
            saveFormat: 'ဖော်မတ်သိမ်းမည်',
            roleAdmin: 'အုပ်ချုပ်သူ',
            roleBranch: branch => `ရုံးခွဲ · ${branch}`,
            noPhoto: 'မရှိသေး',
            viewPhoto: 'ကြည့်မည်',
            edit: 'ပြင်ဆင်',
            remove: 'ဖျက်မည်',
            confirmDeleteRecord: 'ဤမှတ်တမ်းကို ဖျက်လိုပါသလား?',
            confirmDeleteFormat: 'ဤဒေတာဖော်မတ်ကို ဖျက်လိုပါသလား?',
            activity_record_created: branch => `${branch} အတွက် မှတ်တမ်းအသစ် ထည့်သွင်းပြီး`,
            activity_record_updated: branch => `${branch} မှတ်တမ်းကို ပြင်ဆင်ပြီး`,
            activity_record_deleted: branch => `${branch} မှတ်တမ်းကို ဖျက်လိုက်သည်`,
            activity_format_created: name => `"${name}" ဖော်မတ် အသစ်ဖန်တီး`,
            activity_format_updated: name => `"${name}" ဖော်မတ်ကို ပြင်ဆင်`,
            activity_format_deleted: name => `"${name}" ဖော်မတ်ကို ဖျက်လိုက်`,
            activity_empty: 'လှုပ်ရှားမှု မရှိသေးပါ',
            branchOnlyNotice: 'ဤမှတ်တမ်းအတွက် သင့်ရုံးခွဲကို သတ်မှတ်ထားပြီးဖြစ်သည်',
            validationPhoto: 'ဓာတ်ပုံ ကိုကြိုတင်ကြည့်ရှုနိုင်သည်',
            exportSuccess: 'Excel ထုတ်ယူပြီး',
            exportFormatSuccess: 'ဖော်မတ်ထုတ်ယူပြီး',
            noData: 'ဒေတာမရှိပါ',
            timeAgoJustNow: 'ယခုတင်',
            timeAgoMinutes: (n) => `${n} မိနစ်အကြာ`,
            timeAgoHours: (n) => `${n} နာရီအကြာ`,
            timeAgoDays: (n) => `${n} ရက်အကြာ`,
            formatOptionsLabel: (headers, metadata, auto) => {
                const opts = [];
                if (headers) opts.push('ခေါင်းစီး');
                if (metadata) opts.push('မီတာဒေတာ');
                if (auto) opts.push('Auto-export');
                return opts.length ? opts.join(', ') : '—';
            }
        }
    };

    const activityTypes = {
        RECORD_CREATED: 'activity_record_created',
        RECORD_UPDATED: 'activity_record_updated',
        RECORD_DELETED: 'activity_record_deleted',
        FORMAT_CREATED: 'activity_format_created',
        FORMAT_UPDATED: 'activity_format_updated',
        FORMAT_DELETED: 'activity_format_deleted'
    };

    let state = {
        records: [],
        formats: [],
        activity: [],
        session: null,
        language: 'en'
    };

    let mapInstance = null;
    let mapMarkers = [];
    let chartInstance = null;

    const qs = (selector, ctx = document) => ctx.querySelector(selector);
    const qsa = (selector, ctx = document) => Array.from(ctx.querySelectorAll(selector));

    const loadState = () => {
        try {
            state.records = JSON.parse(localStorage.getItem(STORAGE_KEYS.records) || '[]');
            state.formats = JSON.parse(localStorage.getItem(STORAGE_KEYS.formats) || '[]');
            state.activity = JSON.parse(localStorage.getItem(STORAGE_KEYS.activity) || '[]');
            state.session = JSON.parse(localStorage.getItem(STORAGE_KEYS.session) || 'null');
            state.language = localStorage.getItem(STORAGE_KEYS.language) || 'en';
        } catch (error) {
            console.error('Failed to parse storage', error);
        }
        if (!state.records.length) {
            state.records = getSeedRecords();
        }
        if (!state.formats.length) {
            state.formats = getSeedFormats();
        }
        if (!state.activity.length) {
            state.activity = getSeedActivity();
        }
    };

    const persist = () => {
        localStorage.setItem(STORAGE_KEYS.records, JSON.stringify(state.records));
        localStorage.setItem(STORAGE_KEYS.formats, JSON.stringify(state.formats));
        localStorage.setItem(STORAGE_KEYS.activity, JSON.stringify(state.activity));
        if (state.session) {
            localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(state.session));
        }
        localStorage.setItem(STORAGE_KEYS.language, state.language);
    };

    const getSeedRecords = () => {
        const today = new Date();
        return [
            {
                id: crypto.randomUUID(),
                date: today.toISOString().slice(0, 10),
                branch: 'Bangkok Central',
                agent: 'Warin S.',
                flyers: 320,
                interactions: 58,
                customerType: 'project',
                latitude: 13.7563,
                longitude: 100.5018,
                notes: 'Targeted new residential project near BTS station.',
                photo: null,
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                id: crypto.randomUUID(),
                date: new Date(today.getTime() - 86400000).toISOString().slice(0, 10),
                branch: 'Chiang Mai North',
                agent: 'Krit P.',
                flyers: 180,
                interactions: 34,
                customerType: 'existing-member',
                latitude: 18.7953,
                longitude: 98.9985,
                notes: 'Follow up with existing members at community mall.',
                photo: null,
                createdAt: Date.now(),
                updatedAt: Date.now()
            },
            {
                id: crypto.randomUUID(),
                date: new Date(today.getTime() - 172800000).toISOString().slice(0, 10),
                branch: 'Yangon Hub',
                agent: 'Ei Mon',
                flyers: 260,
                interactions: 46,
                customerType: 'factory-company',
                latitude: 16.8409,
                longitude: 96.1735,
                notes: 'Visited logistics companies around downtown.',
                photo: null,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
        ];
    };

    const getSeedFormats = () => [
        {
            id: crypto.randomUUID(),
            name: 'Weekly Excel Summary',
            type: 'Excel',
            description: 'Standard export containing weekly KPI overview.',
            includeHeaders: true,
            includeMetadata: true,
            autoExport: false,
            status: 'active',
            createdAt: Date.now(),
            updatedAt: Date.now()
        },
        {
            id: crypto.randomUUID(),
            name: 'Branch CSV Snapshot',
            type: 'CSV',
            description: 'Lightweight CSV file for branch-level review.',
            includeHeaders: true,
            includeMetadata: false,
            autoExport: true,
            status: 'active',
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
    ];

    const getSeedActivity = () => [
        { id: crypto.randomUUID(), type: activityTypes.RECORD_CREATED, value: { branch: 'Bangkok Central' }, timestamp: Date.now() - 3600000 },
        { id: crypto.randomUUID(), type: activityTypes.FORMAT_CREATED, value: { name: 'Weekly Excel Summary' }, timestamp: Date.now() - 5400000 }
    ];

    const saveSession = (session) => {
        state.session = session;
        if (session) {
            localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
        } else {
            localStorage.removeItem(STORAGE_KEYS.session);
        }
    };

    const addActivity = (type, value) => {
        const activity = { id: crypto.randomUUID(), type, value, timestamp: Date.now() };
        state.activity.unshift(activity);
        state.activity = state.activity.slice(0, 25);
        persist();
        renderActivity();
    };

    const branchColorByName = (branchName) => {
        const match = BRANCHES.find((branch) => branch.name === branchName);
        return match ? match.color : '#2563eb';
    };

    const formatNumber = (value) => value.toLocaleString();

    const currentTranslations = () => translations[state.language] || translations.en;

    const LOCATION_STATUS_COLORS = {
        locationFetching: 'text-amber-600',
        locationSuccess: 'text-emerald-600',
        locationLoaded: 'text-emerald-600',
        locationError: 'text-rose-600',
        locationPermission: 'text-rose-600',
        locationUnavailable: 'text-rose-600'
    };

    const hasGeolocationSupport = () => typeof navigator !== 'undefined' && !!navigator.geolocation;

    let recordLocationStatusKey = 'locationReady';
    let recordLocationLoading = false;

    const renderLocationStatus = () => {
        const statusEl = qs('#recordLocationStatus');
        if (!statusEl) return;
        const dict = currentTranslations();
        const fallback = translations.en;
        const message = dict[recordLocationStatusKey] || fallback[recordLocationStatusKey] || '';
        statusEl.textContent = message;
        const colorClasses = ['text-slate-500', 'text-amber-600', 'text-emerald-600', 'text-rose-600'];
        colorClasses.forEach((cls) => statusEl.classList.remove(cls));
        statusEl.classList.add(LOCATION_STATUS_COLORS[recordLocationStatusKey] || 'text-slate-500');
    };

    const renderLocationButtonLabel = () => {
        const button = qs('#recordUseLocation');
        if (!button) return;
        const dict = currentTranslations();
        const fallback = translations.en;
        const key = recordLocationLoading ? 'locationFetching' : 'locationAction';
        button.textContent = dict[key] || fallback[key] || '';
        const disabled = recordLocationLoading || !hasGeolocationSupport();
        button.disabled = disabled;
        button.classList.toggle('opacity-60', disabled);
        button.classList.toggle('cursor-not-allowed', disabled);
        button.classList.toggle('pointer-events-none', disabled);
        button.setAttribute('aria-busy', recordLocationLoading ? 'true' : 'false');
    };

    const setLocationLoading = (loading) => {
        recordLocationLoading = loading;
        renderLocationButtonLabel();
    };

    const setLocationStatus = (key) => {
        recordLocationStatusKey = key;
        renderLocationStatus();
    };

    const applyLocationToForm = (latitude, longitude) => {
        const latInput = qs('#recordLatitude');
        const lngInput = qs('#recordLongitude');
        if (latInput && Number.isFinite(latitude)) {
            latInput.value = latitude.toFixed(6);
        }
        if (lngInput && Number.isFinite(longitude)) {
            lngInput.value = longitude.toFixed(6);
        }
        [latInput, lngInput].forEach((input) => {
            if (!input) return;
            input.classList.add('ring-2', 'ring-blue-200');
            setTimeout(() => {
                input.classList.remove('ring-2', 'ring-blue-200');
            }, 1200);
        });
    };

    const requestCurrentLocation = () => {
        if (recordLocationLoading) return;
        if (!hasGeolocationSupport()) {
            setLocationStatus('locationUnavailable');
            renderLocationButtonLabel();
            return;
        }
        setLocationLoading(true);
        setLocationStatus('locationFetching');
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLocationLoading(false);
                applyLocationToForm(position.coords.latitude, position.coords.longitude);
                setLocationStatus('locationSuccess');
            },
            (error) => {
                setLocationLoading(false);
                if (error.code === error.PERMISSION_DENIED) {
                    setLocationStatus('locationPermission');
                } else {
                    setLocationStatus('locationError');
                }
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    };

    const applyTranslations = () => {
        const dict = currentTranslations();
        qsa('[data-i18n]').forEach((node) => {
            const key = node.dataset.i18n;
            if (!(key in dict)) return;
            const value = dict[key];
            if (typeof value === 'function') return;
            node.textContent = value;
        });
        qsa('[data-i18n-placeholder]').forEach((node) => {
            const key = node.dataset.i18nPlaceholder;
            const value = dict[key];
            if (!value) return;
            node.setAttribute('placeholder', value);
        });
        populateCustomerTypes();
        renderRoleBadge();
        if (state.session) enforceRoleAccess();
        renderRecordsTable();
        renderActivity();
        renderFormatsTable();
        renderLocationButtonLabel();
        renderLocationStatus();
    };

    const populateBranchSelects = () => {
        const branchSelect = qs('#branchSelect');
        const formBranch = qs('#recordBranch');
        const filterBranch = qs('#filterBranch');
        [branchSelect, formBranch, filterBranch].forEach((select) => {
            if (!select) return;
            const keep = select === branchSelect ? 1 : select === filterBranch ? 1 : 0;
            while (select.options.length > keep) {
                select.remove(select.options.length - 1);
            }
        });
        BRANCHES.forEach((branch) => {
            const option = new Option(branch.name, branch.name);
            branchSelect?.add(option.cloneNode(true));
            formBranch?.add(option.cloneNode(true));
            filterBranch?.add(option.cloneNode(true));
        });
    };

    const populateCustomerTypes = () => {
        const customerTypeSelect = qs('#recordCustomerType');
        const filterCustomerType = qs('#filterCustomerType');
        if (customerTypeSelect) {
            const currentValue = customerTypeSelect.value;
            customerTypeSelect.innerHTML = '';
            CUSTOMER_TYPES.forEach((type) => {
                const option = document.createElement('option');
                option.value = type.id;
                option.textContent = type.i18n[state.language];
                customerTypeSelect.append(option);
            });
            if (currentValue) customerTypeSelect.value = currentValue;
        }
        if (filterCustomerType) {
            const dict = currentTranslations();
            const current = filterCustomerType.value;
            filterCustomerType.innerHTML = '';
            const allOption = document.createElement('option');
            allOption.value = '';
            allOption.textContent = dict.allTypes;
            filterCustomerType.append(allOption);
            CUSTOMER_TYPES.forEach((type) => {
                const option = document.createElement('option');
                option.value = type.id;
                option.textContent = type.i18n[state.language];
                filterCustomerType.append(option);
            });
            filterCustomerType.value = current;
        }
    };

    const getFilteredRecords = () => {
        const filterBranch = qs('#filterBranch').value;
        const filterDate = qs('#filterDate').value;
        const filterType = qs('#filterCustomerType').value;
        return state.records.filter((record) => {
            if (state.session?.role === 'branch' && record.branch !== state.session.branch) return false;
            if (filterBranch && record.branch !== filterBranch) return false;
            if (filterDate && record.date !== filterDate) return false;
            if (filterType && record.customerType !== filterType) return false;
            return true;
        });
    };

    const renderStats = () => {
        const records = getAccessibleRecords();
        const totalFlyers = records.reduce((sum, item) => sum + Number(item.flyers || 0), 0);
        const totalInteractions = records.reduce((sum, item) => sum + Number(item.interactions || 0), 0);
        const uniqueBranches = new Set(records.map((item) => item.branch));
        const withPhotos = records.filter((item) => !!item.photo).length;
        qs('#totalFlyers').textContent = formatNumber(totalFlyers);
        qs('#activeBranches').textContent = uniqueBranches.size;
        qs('#totalInteractions').textContent = formatNumber(totalInteractions);
        qs('#photoCount').textContent = withPhotos;
    };

    const getAccessibleRecords = () => {
        if (state.session?.role === 'branch') {
            return state.records.filter((record) => record.branch === state.session.branch);
        }
        return [...state.records];
    };

    const renderMap = () => {
        const mapContainer = qs('#map');
        if (!mapContainer) return;
        const dict = currentTranslations();
        if (!mapInstance) {
            mapInstance = L.map('map', { zoomControl: false });
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(mapInstance);
        } else {
            setTimeout(() => mapInstance.invalidateSize(), 120);
        }
        mapMarkers.forEach((marker) => marker.remove());
        mapMarkers = [];
        const records = getAccessibleRecords();
        const bounds = L.latLngBounds([]);
        records.forEach((record) => {
            const marker = L.circleMarker([record.latitude, record.longitude], {
                radius: 8,
                color: branchColorByName(record.branch),
                fillColor: branchColorByName(record.branch),
                fillOpacity: 0.8,
                weight: 2
            }).addTo(mapInstance);
            marker.bindPopup(`<div class="text-sm"><p class="font-semibold">${record.branch}</p><p>${record.agent}</p><p>${record.flyers} ${dict.tableFlyers}</p></div>`);
            mapMarkers.push(marker);
            bounds.extend([record.latitude, record.longitude]);
        });
        if (records.length) {
            mapInstance.fitBounds(bounds.pad(0.3));
        } else {
            mapInstance.setView([15.87, 100.99], 5);
        }
        renderBranchLegend();
    };

    const renderBranchLegend = () => {
        const legend = qs('#branchLegend');
        if (!legend) return;
        legend.innerHTML = '';
        const accessibleBranches = new Set(getAccessibleRecords().map((record) => record.branch));
        BRANCHES.forEach((branch) => {
            if (accessibleBranches.size && !accessibleBranches.has(branch.name)) return;
            const item = document.createElement('div');
            item.className = 'flex items-center gap-1';
            const swatch = document.createElement('span');
            swatch.className = 'inline-block h-2.5 w-2.5 rounded-full';
            swatch.style.background = branch.color;
            const label = document.createElement('span');
            label.textContent = branch.name;
            item.append(swatch, label);
            legend.append(item);
        });
    };

    const renderChart = () => {
        const chartContainer = qs('#branchChart');
        if (!chartContainer) return;
        if (!chartInstance) {
            chartInstance = echarts.init(chartContainer);
        }
        const records = getAccessibleRecords();
        const branchTotals = BRANCHES.reduce((acc, branch) => ({ ...acc, [branch.name]: 0 }), {});
        records.forEach((record) => {
            branchTotals[record.branch] = (branchTotals[record.branch] || 0) + Number(record.flyers || 0);
        });
        chartInstance.setOption({
            tooltip: { trigger: 'axis' },
            grid: { left: 40, right: 10, top: 30, bottom: 30 },
            xAxis: { type: 'category', data: Object.keys(branchTotals), axisLabel: { rotate: 20 } },
            yAxis: { type: 'value' },
            series: [
                {
                    data: Object.keys(branchTotals).map((branch) => ({
                        value: branchTotals[branch],
                        itemStyle: { color: branchColorByName(branch) }
                    })),
                    type: 'bar',
                    barWidth: '50%'
                }
            ]
        });
    };

    const renderRecordsTable = () => {
        const tbody = qs('#recordsBody');
        if (!tbody) return;
        const dict = currentTranslations();
        tbody.innerHTML = '';
        const records = getFilteredRecords();
        if (!records.length) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 9;
            cell.className = 'px-4 py-6 text-center text-slate-400';
            cell.textContent = dict.noData || '—';
            row.append(cell);
            tbody.append(row);
            return;
        }
        records.forEach((record) => {
            const tr = document.createElement('tr');
            tr.className = 'hover:bg-slate-50';
            tr.innerHTML = `
                <td class="px-4 py-3 align-top">${record.date}</td>
                <td class="px-4 py-3 align-top">${record.branch}</td>
                <td class="px-4 py-3 align-top">${record.agent}</td>
                <td class="px-4 py-3 align-top">${formatNumber(Number(record.flyers || 0))}</td>
                <td class="px-4 py-3 align-top">${formatNumber(Number(record.interactions || 0))}</td>
                <td class="px-4 py-3 align-top">${customerTypeLabel(record.customerType)}</td>
                <td class="px-4 py-3 align-top text-xs">${Number(record.latitude).toFixed(4)}, ${Number(record.longitude).toFixed(4)}</td>
                <td class="px-4 py-3 align-top">${renderPhotoCell(record)}</td>
                <td class="px-4 py-3 align-top">
                    <div class="flex flex-wrap gap-2 text-xs">
                        <button class="rounded-full border border-blue-200 px-3 py-1 text-blue-600 hover:bg-blue-50" data-action="edit" data-id="${record.id}">${dict.edit}</button>
                        <button class="rounded-full border border-rose-200 px-3 py-1 text-rose-500 hover:bg-rose-50" data-action="delete" data-id="${record.id}">${dict.remove}</button>
                    </div>
                </td>`;
            tbody.append(tr);
        });
    };

    const customerTypeLabel = (typeId) => {
        const match = CUSTOMER_TYPES.find((type) => type.id === typeId);
        if (!match) return typeId;
        return match.i18n[state.language] || match.i18n.en;
    };

    const renderPhotoCell = (record) => {
        const dict = currentTranslations();
        if (!record.photo) return `<span class="text-slate-400">${dict.noPhoto}</span>`;
        return `<button class="rounded-full border border-slate-200 px-3 py-1 text-xs text-slate-600 hover:bg-slate-100" data-action="photo" data-id="${record.id}">${dict.viewPhoto}</button>`;
    };

    const renderActivity = () => {
        const list = qs('#activityFeed');
        if (!list) return;
        list.innerHTML = '';
        const dict = currentTranslations();
        if (!state.activity.length) {
            const empty = document.createElement('li');
            empty.className = 'text-slate-400';
            empty.textContent = dict.activity_empty;
            list.append(empty);
            return;
        }
        state.activity.slice(0, 8).forEach((item) => {
            const entry = document.createElement('li');
            entry.className = 'rounded-2xl border border-slate-200 bg-slate-50/70 px-3 py-2';
            entry.innerHTML = `<p class="font-medium text-slate-700">${formatActivity(item)}</p><p class="text-[10px] uppercase tracking-wide text-slate-400">${timeAgo(item.timestamp)}</p>`;
            list.append(entry);
        });
    };

    const formatActivity = (activity) => {
        const dict = currentTranslations();
        const formatter = dict[activity.type];
        if (typeof formatter === 'function') {
            if (activity.value.branch) return formatter(activity.value.branch);
            if (activity.value.name) return formatter(activity.value.name);
        }
        return '—';
    };

    const timeAgo = (timestamp) => {
        const diff = Date.now() - timestamp;
        const minute = 60000;
        const dict = currentTranslations();
        if (diff < minute) return dict.timeAgoJustNow || 'Just now';
        const minutes = Math.floor(diff / minute);
        if (diff < 60 * minute) return dict.timeAgoMinutes ? dict.timeAgoMinutes(minutes) : `${minutes}m ago`;
        const hour = 60 * minute;
        const hours = Math.floor(diff / hour);
        if (diff < 24 * hour) return dict.timeAgoHours ? dict.timeAgoHours(hours) : `${hours}h ago`;
        const day = 24 * hour;
        const days = Math.floor(diff / day);
        return dict.timeAgoDays ? dict.timeAgoDays(days) : `${days}d ago`;
    };

    const renderFormatsTable = () => {
        const tbody = qs('#formatsBody');
        if (!tbody) return;
        const dict = currentTranslations();
        tbody.innerHTML = '';
        const formats = state.formats;
        if (!formats.length) {
            const row = document.createElement('tr');
            const cell = document.createElement('td');
            cell.colSpan = 5;
            cell.className = 'px-4 py-6 text-center text-slate-400';
            cell.textContent = dict.noData || '—';
            row.append(cell);
            tbody.append(row);
        }
        formats.forEach((format) => {
            const row = document.createElement('tr');
            row.className = 'hover:bg-slate-50';
            const optionsLabel = dict.formatOptionsLabel(format.includeHeaders, format.includeMetadata, format.autoExport);
            row.innerHTML = `
                <td class="px-4 py-3 align-top">${format.name}</td>
                <td class="px-4 py-3 align-top">${format.type}</td>
                <td class="px-4 py-3 align-top">
                    <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${format.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'}">
                        ${format.status === 'active' ? dict.statusActive : dict.statusInactive}
                    </span>
                </td>
                <td class="px-4 py-3 align-top text-xs">${optionsLabel}</td>
                <td class="px-4 py-3 align-top">
                    <div class="flex flex-wrap gap-2 text-xs">
                        <button class="rounded-full border border-blue-200 px-3 py-1 text-blue-600 hover:bg-blue-50" data-format-action="edit" data-id="${format.id}">${dict.edit}</button>
                        <button class="rounded-full border border-slate-200 px-3 py-1 text-slate-600 hover:bg-slate-100" data-format-action="export" data-id="${format.id}">${dict.exportFormat}</button>
                        <button class="rounded-full border border-rose-200 px-3 py-1 text-rose-500 hover:bg-rose-50" data-format-action="delete" data-id="${format.id}">${dict.remove}</button>
                    </div>
                </td>`;
            tbody.append(row);
        });
        qs('#formatTotal').textContent = formats.length;
        qs('#formatActive').textContent = formats.filter((f) => f.status === 'active').length;
        qs('#formatExcel').textContent = formats.filter((f) => f.type === 'Excel').length;
    };

    const bindEvents = () => {
        qs('#languageSelect').addEventListener('change', (event) => {
            state.language = event.target.value;
            persist();
            applyTranslations();
        });

        qs('#logoutBtn').addEventListener('click', () => {
            saveSession(null);
            document.body.dataset.page = 'dashboard';
            qs('#appWrapper').classList.add('hidden');
            qs('#roleOverlay').classList.remove('hidden');
        });

        qs('#adminSelect').addEventListener('click', () => {
            authenticate('admin');
        });

        qs('#branchConfirm').addEventListener('click', () => {
            const branch = qs('#branchSelect').value;
            if (!branch) return;
            authenticate('branch', branch);
        });

        qsa('.nav-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                const target = event.currentTarget.dataset.target;
                switchPage(target);
            });
        });

        qs('#openAddRecord').addEventListener('click', () => openRecordModal());
        qs('#openFormats').addEventListener('click', () => switchPage('formats'));

        qs('#recordForm').addEventListener('submit', handleRecordSubmit);
        qs('#recordPhoto').addEventListener('change', handlePhotoPreview);
        qs('#recordUseLocation')?.addEventListener('click', () => requestCurrentLocation());

        qs('#recordModal').addEventListener('click', (event) => {
            if (event.target.dataset.close !== undefined || event.target === event.currentTarget) {
                closeRecordModal();
            }
        });
        qs('#formatModal').addEventListener('click', (event) => {
            if (event.target.dataset.close !== undefined || event.target === event.currentTarget) {
                closeFormatModal();
            }
        });

        qs('#recordsBody').addEventListener('click', (event) => {
            const action = event.target.dataset.action;
            if (!action) return;
            const id = event.target.dataset.id;
            if (action === 'edit') openRecordModal(id);
            if (action === 'delete') deleteRecord(id);
            if (action === 'photo') previewPhoto(id);
        });

        ['filterBranch', 'filterCustomerType', 'filterDate'].forEach((id) => {
            const element = qs(`#${id}`);
            element?.addEventListener('change', () => {
                renderRecordsTable();
            });
        });
        qs('#clearFilters').addEventListener('click', () => {
            qs('#filterBranch').value = '';
            qs('#filterCustomerType').value = '';
            qs('#filterDate').value = '';
            if (state.session?.role === 'branch') enforceRoleAccess();
            renderRecordsTable();
        });

        qs('#refreshChart').addEventListener('click', () => renderChart());
        qs('#exportExcelBtn').addEventListener('click', exportRecordsToExcel);

        qs('#addFormatBtn').addEventListener('click', () => openFormatModal());
        qs('#exportFormatsBtn').addEventListener('click', exportFormatsToExcel);

        qs('#formatForm').addEventListener('submit', handleFormatSubmit);
        qs('#formatsBody').addEventListener('click', (event) => {
            const action = event.target.dataset.formatAction;
            if (!action) return;
            const id = event.target.dataset.id;
            if (action === 'edit') openFormatModal(id);
            if (action === 'delete') deleteFormat(id);
            if (action === 'export') exportFormatToExcel(id);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeRecordModal();
                closeFormatModal();
                closePhotoPreview();
            }
        });
    };

    const authenticate = (role, branch = null) => {
        saveSession({ role, branch });
        persist();
        qs('#roleOverlay').classList.add('hidden');
        qs('#appWrapper').classList.remove('hidden');
        renderRoleBadge();
        enforceRoleAccess();
        renderStats();
        renderMap();
        renderChart();
        renderRecordsTable();
        renderFormatsTable();
        animeCards();
    };

    const renderRoleBadge = () => {
        const badge = qs('#roleBadge');
        if (!badge) return;
        badge.innerHTML = '';
        if (!state.session) return;
        const dict = currentTranslations();
        if (state.session.role === 'admin') badge.textContent = dict.roleAdmin;
        if (state.session.role === 'branch') badge.textContent = dict.roleBranch(state.session.branch);
    };

    const enforceRoleAccess = () => {
        const navFormats = qsa('[data-target="formats"]');
        const openFormatsBtn = qs('#openFormats');
        const filterBranch = qs('#filterBranch');
        if (state.session?.role === 'admin') {
            navFormats.forEach((el) => el.classList.remove('hidden'));
            openFormatsBtn?.classList.remove('hidden');
            filterBranch?.removeAttribute('disabled');
            filterBranch?.classList.remove('opacity-60');
            filterBranch?.setAttribute('title', '');
        } else {
            navFormats.forEach((el) => el.classList.add('hidden'));
            openFormatsBtn?.classList.add('hidden');
            if (document.body.dataset.page === 'formats') switchPage('dashboard');
            if (filterBranch) {
                filterBranch.value = state.session?.branch || '';
                filterBranch.setAttribute('disabled', 'disabled');
                filterBranch.classList.add('opacity-60');
                filterBranch.setAttribute('title', currentTranslations().branchOnlyNotice || '');
            }
        }
    };

    const switchPage = (page) => {
        if (state.session?.role !== 'admin' && page === 'formats') return;
        document.body.dataset.page = page;
        qsa('.page-section').forEach((section) => {
            section.classList.toggle('hidden', section.id !== page);
        });
        qsa('.nav-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.target === page);
        });
        if (page === 'dashboard') {
            renderStats();
            renderChart();
            renderMap();
        }
        if (page === 'records') renderRecordsTable();
        if (page === 'formats') renderFormatsTable();
    };

    const openRecordModal = (id = null) => {
        const dict = currentTranslations();
        const modal = qs('#recordModal');
        const form = qs('#recordForm');
        form.reset();
        qs('#recordId').value = '';
        qs('#photoPreview').classList.add('hidden');
        qs('#photoPreview').src = '';
        qs('#recordDate').value = new Date().toISOString().slice(0, 10);
        const geoSupported = hasGeolocationSupport();
        setLocationLoading(false);
        setLocationStatus(geoSupported ? 'locationReady' : 'locationUnavailable');
        renderLocationButtonLabel();
        if (state.session?.role === 'branch') {
            qs('#recordBranch').value = state.session.branch;
            qs('#recordBranch').setAttribute('disabled', 'disabled');
            qs('#recordBranch').title = dict.branchOnlyNotice;
        } else {
            qs('#recordBranch').removeAttribute('disabled');
            qs('#recordBranch').title = '';
        }
        if (id) {
            const record = state.records.find((item) => item.id === id);
            if (!record) return;
            qs('#recordId').value = record.id;
            qs('#recordDate').value = record.date;
            qs('#recordBranch').value = record.branch;
            qs('#recordAgent').value = record.agent;
            qs('#recordFlyers').value = record.flyers;
            qs('#recordInteractions').value = record.interactions;
            qs('#recordCustomerType').value = record.customerType;
            const latValue = Number(record.latitude);
            const lngValue = Number(record.longitude);
            qs('#recordLatitude').value = Number.isFinite(latValue) ? latValue.toFixed(6) : record.latitude || '';
            qs('#recordLongitude').value = Number.isFinite(lngValue) ? lngValue.toFixed(6) : record.longitude || '';
            qs('#recordNotes').value = record.notes || '';
            if (record.photo) {
                qs('#photoPreview').src = record.photo;
                qs('#photoPreview').classList.remove('hidden');
            }
            if (Number.isFinite(latValue) && Number.isFinite(lngValue)) {
                setLocationStatus('locationLoaded');
            } else if (!geoSupported) {
                setLocationStatus('locationUnavailable');
            } else {
                setLocationStatus('locationReady');
            }
        } else if (geoSupported) {
            requestCurrentLocation();
        }
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    const closeRecordModal = () => {
        const modal = qs('#recordModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    const handleRecordSubmit = (event) => {
        event.preventDefault();
        const id = qs('#recordId').value;
        const recordData = {
            id: id || crypto.randomUUID(),
            date: qs('#recordDate').value,
            branch: qs('#recordBranch').value,
            agent: qs('#recordAgent').value.trim(),
            flyers: Number(qs('#recordFlyers').value),
            interactions: Number(qs('#recordInteractions').value),
            customerType: qs('#recordCustomerType').value,
            latitude: Number(qs('#recordLatitude').value),
            longitude: Number(qs('#recordLongitude').value),
            notes: qs('#recordNotes').value.trim(),
            photo: qs('#photoPreview').src || null,
            createdAt: id ? state.records.find((item) => item.id === id)?.createdAt ?? Date.now() : Date.now(),
            updatedAt: Date.now()
        };
        if (id) {
            const index = state.records.findIndex((item) => item.id === id);
            state.records[index] = recordData;
            addActivity(activityTypes.RECORD_UPDATED, { branch: recordData.branch });
        } else {
            state.records.unshift(recordData);
            addActivity(activityTypes.RECORD_CREATED, { branch: recordData.branch });
        }
        persist();
        closeRecordModal();
        renderStats();
        renderMap();
        renderChart();
        renderRecordsTable();
    };

    const deleteRecord = (id) => {
        const record = state.records.find((item) => item.id === id);
        if (!record) return;
        if (!confirm(currentTranslations().confirmDeleteRecord || 'Delete this record?')) return;
        state.records = state.records.filter((item) => item.id !== id);
        addActivity(activityTypes.RECORD_DELETED, { branch: record.branch });
        persist();
        renderStats();
        renderMap();
        renderChart();
        renderRecordsTable();
    };

    const handlePhotoPreview = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            const preview = qs('#photoPreview');
            preview.src = ev.target.result;
            preview.classList.remove('hidden');
            flashToast(currentTranslations().validationPhoto);
        };
        reader.readAsDataURL(file);
    };

    const previewPhoto = (id) => {
        const record = state.records.find((item) => item.id === id);
        if (!record?.photo) return;
        openPhotoPreview(record.photo, `${record.branch} · ${record.agent}`);
    };

    let photoOverlay = null;
    const openPhotoPreview = (src, title) => {
        closePhotoPreview();
        photoOverlay = document.createElement('div');
        photoOverlay.className = 'fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-6';
        photoOverlay.innerHTML = `
            <div class="relative max-w-sm rounded-3xl bg-white p-4 shadow-2xl">
                <button class="absolute right-3 top-3 rounded-full border border-slate-200 p-1 text-slate-400 hover:text-slate-600" data-close-photo>&times;</button>
                <p class="mb-2 text-xs uppercase tracking-wide text-slate-400">${title}</p>
                <img src="${src}" alt="Photo preview" class="max-h-[60vh] w-full rounded-2xl object-cover" />
            </div>`;
        photoOverlay.addEventListener('click', (event) => {
            if (event.target === photoOverlay || event.target.dataset.closePhoto !== undefined) closePhotoPreview();
        });
        document.body.append(photoOverlay);
    };

    const closePhotoPreview = () => {
        if (photoOverlay) {
            photoOverlay.remove();
            photoOverlay = null;
        }
    };

    const handleFormatSubmit = (event) => {
        event.preventDefault();
        const id = qs('#formatId').value;
        const formatData = {
            id: id || crypto.randomUUID(),
            name: qs('#formatName').value.trim(),
            type: qs('#formatType').value,
            description: qs('#formatDescription').value.trim(),
            includeHeaders: qs('#formatIncludeHeaders').checked,
            includeMetadata: qs('#formatIncludeMetadata').checked,
            autoExport: qs('#formatAutoExport').checked,
            status: qs('#formatStatus').value,
            createdAt: id ? state.formats.find((item) => item.id === id)?.createdAt ?? Date.now() : Date.now(),
            updatedAt: Date.now()
        };
        if (id) {
            const index = state.formats.findIndex((item) => item.id === id);
            state.formats[index] = formatData;
            addActivity(activityTypes.FORMAT_UPDATED, { name: formatData.name });
        } else {
            state.formats.unshift(formatData);
            addActivity(activityTypes.FORMAT_CREATED, { name: formatData.name });
        }
        persist();
        closeFormatModal();
        renderFormatsTable();
    };

    const deleteFormat = (id) => {
        const format = state.formats.find((item) => item.id === id);
        if (!format) return;
        if (!confirm(currentTranslations().confirmDeleteFormat || 'Delete this data format?')) return;
        state.formats = state.formats.filter((item) => item.id !== id);
        addActivity(activityTypes.FORMAT_DELETED, { name: format.name });
        persist();
        renderFormatsTable();
    };

    const openFormatModal = (id = null) => {
        const modal = qs('#formatModal');
        const form = qs('#formatForm');
        form.reset();
        qs('#formatId').value = '';
        if (id) {
            const format = state.formats.find((item) => item.id === id);
            if (!format) return;
            qs('#formatId').value = format.id;
            qs('#formatName').value = format.name;
            qs('#formatType').value = format.type;
            qs('#formatDescription').value = format.description;
            qs('#formatIncludeHeaders').checked = format.includeHeaders;
            qs('#formatIncludeMetadata').checked = format.includeMetadata;
            qs('#formatAutoExport').checked = format.autoExport;
            qs('#formatStatus').value = format.status;
        }
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    };

    const closeFormatModal = () => {
        const modal = qs('#formatModal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    };

    const exportRecordsToExcel = () => {
        const records = getAccessibleRecords();
        const worksheetData = [
            ['Date', 'Branch', 'Agent', 'Flyers', 'Interactions', 'Customer Type', 'Latitude', 'Longitude', 'Notes']
        ];
        records.forEach((record) => {
            worksheetData.push([
                record.date,
                record.branch,
                record.agent,
                record.flyers,
                record.interactions,
                customerTypeLabel(record.customerType),
                record.latitude,
                record.longitude,
                record.notes
            ]);
        });
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Flyers');
        XLSX.writeFile(workbook, 'flyer-distribution.xlsx');
        flashToast(currentTranslations().exportSuccess);
    };

    const exportFormatsToExcel = () => {
        const worksheetData = [
            ['Name', 'Type', 'Status', 'Include Headers', 'Include Metadata', 'Auto Export', 'Description']
        ];
        state.formats.forEach((format) => {
            worksheetData.push([
                format.name,
                format.type,
                format.status,
                format.includeHeaders ? 'Yes' : 'No',
                format.includeMetadata ? 'Yes' : 'No',
                format.autoExport ? 'Yes' : 'No',
                format.description
            ]);
        });
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Formats');
        XLSX.writeFile(workbook, 'data-formats.xlsx');
        flashToast(currentTranslations().exportFormatSuccess);
    };

    const exportFormatToExcel = (id) => {
        const format = state.formats.find((item) => item.id === id);
        if (!format) return;
        const worksheetData = [
            ['Field', 'Value'],
            ['Name', format.name],
            ['Type', format.type],
            ['Status', format.status],
            ['Include Headers', format.includeHeaders ? 'Yes' : 'No'],
            ['Include Metadata', format.includeMetadata ? 'Yes' : 'No'],
            ['Auto Export', format.autoExport ? 'Yes' : 'No'],
            ['Description', format.description]
        ];
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, format.name.slice(0, 30) || 'Format');
        XLSX.writeFile(workbook, `${format.name.replace(/\s+/g, '-').toLowerCase()}-format.xlsx`);
        flashToast(currentTranslations().exportFormatSuccess);
    };

    const flashToast = (message) => {
        if (!message) return;
        const toast = document.createElement('div');
        toast.className = 'fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-lg';
        toast.textContent = message;
        document.body.append(toast);
        setTimeout(() => {
            toast.classList.add('opacity-0');
            toast.style.transition = 'opacity 0.4s ease';
            setTimeout(() => toast.remove(), 400);
        }, 1800);
    };

    const animeCards = () => {
        const cards = qsa('.stat-card');
        anime({
            targets: cards,
            translateY: [20, 0],
            opacity: [0, 1],
            delay: anime.stagger(80),
            easing: 'easeOutQuad'
        });
    };

    const restoreSession = () => {
        if (!state.session) return;
        qs('#roleOverlay').classList.add('hidden');
        qs('#appWrapper').classList.remove('hidden');
        qs('#languageSelect').value = state.language;
        renderRoleBadge();
        enforceRoleAccess();
        renderStats();
        renderMap();
        renderChart();
        renderRecordsTable();
        renderFormatsTable();
        animeCards();
    };

    const init = () => {
        loadState();
        populateBranchSelects();
        populateCustomerTypes();
        applyTranslations();
        bindEvents();
        qs('#languageSelect').value = state.language;
        if (state.session) {
            restoreSession();
        } else {
            qs('#appWrapper').classList.add('hidden');
            qs('#roleOverlay').classList.remove('hidden');
        }
    };

    document.addEventListener('DOMContentLoaded', init);

    return {
        getState: () => state,
        getTranslations: () => translations
    };
})();
