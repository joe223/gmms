/**
 * Created by 19375 on 2017/3/15.
 */

fs = require('fs');
var extend = require('util')._extend

var globalCountries = [
    {code: "US", en: "United States of America (USA)", cn: "美国"},
    {code: "AR", en: "Argentina", cn: "阿根廷"},
    {code: "AD", en: "Andorra", cn: "安道尔"},
    {code: "AE", en: "United Arab Emirates", cn: "阿联酋"},
    {code: "AF", en: "Afghanistan", cn: "阿富汗"},
    {code: "AG", en: "Antigua & Barbuda", cn: "安提瓜和巴布达"},
    {code: "AI", en: "Anguilla", cn: "安圭拉"},
    {code: "AL", en: "Albania", cn: "阿尔巴尼亚"},
    {code: "AM", en: "Armenia", cn: "亚美尼亚"},
    {code: "AO", en: "Angola", cn: "安哥拉"},
    {code: "AQ", en: "Antarctica", cn: "南极洲"},
    {code: "AS", en: "American Samoa", cn: "美属萨摩亚"},
    {code: "AT", en: "Austria", cn: "奥地利"},
    {code: "AU", en: "Australia", cn: "澳大利亚"},
    {code: "AW", en: "Aruba", cn: "阿鲁巴"},
    {code: "AX", en: "Aland Island", cn: "奥兰群岛"},
    {code: "AZ", en: "Azerbaijan", cn: "阿塞拜疆"},
    {code: "BA", en: "Bosnia & Herzegovina", cn: "波黑"},
    {code: "BB", en: "Barbados", cn: "巴巴多斯"},
    {code: "BD", en: "Bangladesh", cn: "孟加拉"},
    {code: "BE", en: "Belgium", cn: "比利时"},
    {code: "BF", en: "Burkina", cn: "布基纳法索"},
    {code: "BG", en: "Bulgaria", cn: "保加利亚"},
    {code: "BH", en: "Bahrain", cn: "巴林"},
    {code: "BI", en: "Burundi", cn: "布隆迪"},
    {code: "BJ", en: "Benin", cn: "贝宁"},
    {code: "BL", en: "Saint Barthélemy", cn: "圣巴泰勒米岛"},
    {code: "BM", en: "Bermuda", cn: "百慕大"},
    {code: "BN", en: "Brunei", cn: "文莱"},
    {code: "BO", en: "Bolivia", cn: "玻利维亚"},
    {code: "BQ", en: "Caribbean Netherlands", cn: "荷兰加勒比区"},
    {code: "BR", en: "Brazil", cn: "巴西"},
    {code: "BS", en: "The Bahamas", cn: "巴哈马"},
    {code: "BT", en: "Bhutan", cn: "不丹"},
    {code: "BV", en: "Bouvet Island", cn: "布韦岛"},
    {code: "BW", en: "Botswana", cn: "博茨瓦纳"},
    {code: "BY", en: "Belarus", cn: "白俄罗斯"},
    {code: "BZ", en: "Belize", cn: "伯利兹"},
    {code: "CA", en: "Canada", cn: "加拿大"},
    {code: "CC", en: "Cocos (Keeling) Islands", cn: "科科斯群岛"},
    {code: "CD", en: "Democratic Republic of the Congo", cn: "刚果（金）"},
    {code: "CF", en: "Central African Republic", cn: "中非"},
    {code: "CG", en: "Republic of the Congo", cn: "刚果（布）"},
    {code: "CH", en: "Switzerland", cn: "瑞士"},
    {code: "CI", en: "Cote d'Ivoire", cn: "科特迪瓦"},
    {code: "CK", en: "Cook Islands", cn: "库克群岛"},
    {code: "CL", en: "Chile", cn: "智利"},
    {code: "CM", en: "Cameroon", cn: "喀麦隆"},
    {code: "CN", en: "China", cn: "中国"},
    {code: "CO", en: "Colombia", cn: "哥伦比亚"},
    {code: "CR", en: "Costa Rica", cn: "哥斯达黎加"},
    {code: "CU", en: "Cuba", cn: "古巴"},
    {code: "CV", en: "Cape Verde", cn: "佛得角"},
    {code: "CW", en: "Curacao", cn: "库拉索"},
    {code: "CX", en: "Christmas Island", cn: "圣诞岛"},
    {code: "CY", en: "Cyprus", cn: "塞浦路斯"},
    {code: "CZ", en: "Czech Republic", cn: "捷克"},
    {code: "DE", en: "Germany", cn: "德国"},
    {code: "DJ", en: "Djibouti", cn: "吉布提"},
    {code: "DK", en: "Denmark", cn: "丹麦"},
    {code: "DM", en: "Dominica", cn: "多米尼克"},
    {code: "DO", en: "Dominican Republic", cn: "多米尼加"},
    {code: "DZ", en: "Algeria", cn: "阿尔及利亚"},
    {code: "EC", en: "Ecuador", cn: "厄瓜多尔"},
    {code: "EE", en: "Estonia", cn: "爱沙尼亚"},
    {code: "EG", en: "Egypt", cn: "埃及"},
    {code: "EH", en: "Western Sahara", cn: "西撒哈拉"},
    {code: "ER", en: "Eritrea", cn: "厄立特里亚"},
    {code: "ES", en: "Spain", cn: "西班牙"},
    {code: "ET", en: "Ethiopia", cn: "埃塞俄比亚"},
    {code: "FI", en: "Finland", cn: "芬兰"},
    {code: "FJ", en: "Fiji", cn: "斐济群岛"},
    {code: "FK", en: "Falkland Islands", cn: "马尔维纳斯群岛（福克兰）"},
    {code: "FM", en: "Federated States of Micronesia", cn: "密克罗尼西亚联邦"},
    {code: "FO", en: "Faroe Islands", cn: "法罗群岛"},
    {code: "FR", en: "France", cn: "法国 法国"},
    {code: "GA", en: "Gabon", cn: "加蓬"},
    {code: "GB", en: "Great Britain (United Kingdom; England)", cn: "英国"},
    {code: "GD", en: "Grenada", cn: "格林纳达"},
    {code: "GE", en: "Georgia", cn: "格鲁吉亚"},
    {code: "GF", en: "French Guiana", cn: "法属圭亚那"},
    {code: "GG", en: "Guernsey", cn: "根西岛"},
    {code: "GH", en: "Ghana", cn: "加纳"},
    {code: "GI", en: "Gibraltar", cn: "直布罗陀"},
    {code: "GL", en: "Greenland", cn: "格陵兰"},
    {code: "GM", en: "Gambia", cn: "冈比亚"},
    {code: "GN", en: "Guinea", cn: "几内亚"},
    {code: "GP", en: "Guadeloupe", cn: "瓜德罗普"},
    {code: "GQ", en: "Equatorial Guinea", cn: "赤道几内亚"},
    {code: "GR", en: "Greece", cn: "希腊"},
    {code: "GS", en: "South Georgia and the South Sandwich Islands", cn: "南乔治亚岛和南桑威奇群岛"},
    {code: "GT", en: "Guatemala", cn: "危地马拉"},
    {code: "GU", en: "Guam", cn: "关岛"},
    {code: "GW", en: "Guinea-Bissau", cn: "几内亚比绍"},
    {code: "GY", en: "Guyana", cn: "圭亚那"},
    {code: "HM", en: "Heard Island and McDonald Islands", cn: "赫德岛和麦克唐纳群岛"},
    {code: "HN", en: "Honduras", cn: "洪都拉斯"},
    {code: "HR", en: "Croatia", cn: "克罗地亚"},
    {code: "HT", en: "Haiti", cn: "海地"},
    {code: "HU", en: "Hungary", cn: "匈牙利"},
    {code: "ID", en: "Indonesia", cn: "印尼"},
    {code: "IE", en: "Ireland", cn: "爱尔兰"},
    {code: "IL", en: "Israel", cn: "以色列"},
    {code: "IM", en: "Isle of Man", cn: "马恩岛"},
    {code: "IN", en: "India", cn: "印度"},
    {code: "IO", en: "British Indian Ocean Territory", cn: "英属印度洋领地"},
    {code: "IQ", en: "Iraq", cn: "伊拉克"},
    {code: "IR", en: "Iran", cn: "伊朗"},
    {code: "IS", en: "Iceland", cn: "冰岛"},
    {code: "IT", en: "Italy", cn: "意大利"},
    {code: "JE", en: "Jersey", cn: "泽西岛"},
    {code: "JM", en: "Jamaica", cn: "牙买加"},
    {code: "JO", en: "Jordan", cn: "约旦"},
    {code: "JP", en: "Japan", cn: "日本"},
    {code: "KE", en: "Kenya", cn: "肯尼亚"},
    {code: "KG", en: "Kyrgyzstan", cn: "吉尔吉斯斯坦"},
    {code: "KH", en: "Cambodia", cn: "柬埔寨"},
    {code: "KI", en: "Kiribati", cn: "基里巴斯"},
    {code: "KM", en: "The Comoros", cn: "科摩罗"},
    {code: "KN", en: "St. Kitts & Nevis", cn: "圣基茨和尼维斯"},
    {code: "KP", en: "North Korea", cn: "朝鲜"},
    {code: "KR", en: "South Korea", cn: "韩国"},
    {code: "KW", en: "Kuwait", cn: "科威特"},
    {code: "KY", en: "Cayman Islands", cn: "开曼群岛"},
    {code: "KZ", en: "Kazakhstan", cn: "哈萨克斯坦"},
    {code: "LA", en: "Laos", cn: "老挝"},
    {code: "LB", en: "Lebanon", cn: "黎巴嫩"},
    {code: "LC", en: "St. Lucia", cn: "圣卢西亚"},
    {code: "LI", en: "Liechtenstein", cn: "列支敦士登"},
    {code: "LK", en: "Sri Lanka", cn: "斯里兰卡"},
    {code: "LR", en: "Liberia", cn: "利比里亚"},
    {code: "LS", en: "Lesotho", cn: "莱索托"},
    {code: "LT", en: "Lithuania", cn: "立陶宛"},
    {code: "LU", en: "Luxembourg", cn: "卢森堡"},
    {code: "LV", en: "Latvia", cn: "拉脱维亚"},
    {code: "LY", en: "Libya", cn: "利比亚"},
    {code: "MA", en: "Morocco", cn: "摩洛哥"},
    {code: "MC", en: "Monaco", cn: "摩纳哥"},
    {code: "MD", en: "Moldova", cn: "摩尔多瓦"},
    {code: "ME", en: "Montenegro", cn: "黑山"},
    {code: "MF", en: "Saint Martin (France)", cn: "法属圣马丁"},
    {code: "MG", en: "Madagascar", cn: "马达加斯加"},
    {code: "MH", en: "Marshall islands", cn: "马绍尔群岛"},
    {code: "MK", en: "Republic of Macedonia (FYROM)", cn: "马其顿"},
    {code: "ML", en: "Mali", cn: "马里"},
    {code: "MM", en: "Myanmar (Burma)", cn: "缅甸"},
    {code: "MN", en: "Mongolia", cn: "蒙古国"},
    {code: "MP", en: "Northern Mariana Islands", cn: "北马里亚纳群岛"},
    {code: "MQ", en: "Martinique", cn: "马提尼克"},
    {code: "MR", en: "Mauritania", cn: "毛里塔尼亚"},
    {code: "MS", en: "Montserrat", cn: "蒙塞拉特岛"},
    {code: "MT", en: "Malta", cn: "马耳他"},
    {code: "MU", en: "Mauritius", cn: "毛里求斯"},
    {code: "MV", en: "Maldives", cn: "马尔代夫"},
    {code: "MW", en: "Malawi", cn: "马拉维"},
    {code: "MX", en: "Mexico", cn: "墨西哥"},
    {code: "MY", en: "Malaysia", cn: "马来西亚"},
    {code: "MZ", en: "Mozambique", cn: "莫桑比克"},
    {code: "NA", en: "Namibia", cn: "纳米比亚"},
    {code: "NC", en: "New Caledonia", cn: "新喀里多尼亚"},
    {code: "NE", en: "Niger", cn: "尼日尔"},
    {code: "NF", en: "Norfolk Island", cn: "诺福克岛"},
    {code: "NG", en: "Nigeria", cn: "尼日利亚"},
    {code: "NI", en: "Nicaragua", cn: "尼加拉瓜"},
    {code: "NL", en: "Netherlands", cn: "荷兰"},
    {code: "NO", en: "Norway", cn: "挪威"},
    {code: "NP", en: "Nepal", cn: "尼泊尔"},
    {code: "NR", en: "Nauru", cn: "瑙鲁"},
    {code: "NU", en: "Niue", cn: "纽埃"},
    {code: "NZ", en: "New Zealand", cn: "新西兰"},
    {code: "OM", en: "Oman", cn: "阿曼"},
    {code: "PA", en: "Panama", cn: "巴拿马"},
    {code: "PE", en: "Peru", cn: "秘鲁"},
    {code: "PF", en: "French polynesia", cn: "法属波利尼西亚"},
    {code: "PG", en: "Papua New Guinea", cn: "巴布亚新几内亚"},
    {code: "PH", en: "The Philippines", cn: "菲律宾"},
    {code: "PK", en: "Pakistan", cn: "巴基斯坦"},
    {code: "PL", en: "Poland", cn: "波兰"},
    {code: "PM", en: "Saint-Pierre and Miquelon", cn: "圣皮埃尔和密克隆"},
    {code: "PN", en: "Pitcairn Islands", cn: "皮特凯恩群岛"},
    {code: "PR", en: "Puerto Rico", cn: "波多黎各"},
    {code: "PS", en: "Palestinian territories", cn: "巴勒斯坦"},
    {code: "PT", en: "Portugal", cn: "葡萄牙"},
    {code: "PW", en: "Palau", cn: "帕劳"},
    {code: "PY", en: "Paraguay", cn: "巴拉圭"},
    {code: "QA", en: "Qatar", cn: "卡塔尔"},
    {code: "RE", en: "Réunion", cn: "留尼汪"},
    {code: "RO", en: "Romania", cn: "罗马尼亚"},
    {code: "RS", en: "Serbia", cn: "塞尔维亚"},
    {code: "RU", en: "Russian Federation", cn: "俄罗斯"},
    {code: "RW", en: "Rwanda", cn: "卢旺达"},
    {code: "SA", en: "Saudi Arabia", cn: "沙特阿拉伯"},
    {code: "SB", en: "Solomon Islands", cn: "所罗门群岛"},
    {code: "SC", en: "Seychelles", cn: "塞舌尔"},
    {code: "SD", en: "Sudan", cn: "苏丹"},
    {code: "SE", en: "Sweden", cn: "瑞典"},
    {code: "SG", en: "Singapore", cn: "新加坡"},
    {code: "SH", en: "St. Helena & Dependencies", cn: "圣赫勒拿"},
    {code: "SI", en: "Slovenia", cn: "斯洛文尼亚"},
    {code: "SJ", en: "Svalbard and Jan Mayen", cn: "斯瓦尔巴群岛和扬马延岛"},
    {code: "SK", en: "Slovakia", cn: "斯洛伐克"},
    {code: "SL", en: "Sierra Leone", cn: "塞拉利昂"},
    {code: "SM", en: "San Marino", cn: "圣马力诺"},
    {code: "SN", en: "Senegal", cn: "塞内加尔"},
    {code: "SO", en: "Somalia", cn: "索马里"},
    {code: "SR", en: "Suriname", cn: "苏里南"},
    {code: "SS", en: "South Sudan", cn: "南苏丹"},
    {code: "ST", en: "Sao Tome & Principe", cn: "圣多美和普林西比"},
    {code: "SV", en: "El Salvador", cn: "萨尔瓦多"},
    {code: "SX", en: "Sint Maarten", cn: "荷属圣马丁"},
    {code: "SY", en: "Syria", cn: "叙利亚"},
    {code: "SZ", en: "Swaziland", cn: "斯威士兰"},
    {code: "TC", en: "Turks & Caicos Islands", cn: "特克斯和凯科斯群岛"},
    {code: "TD", en: "Chad", cn: "乍得"},
    {code: "TF", en: "French Southern Territories", cn: "法属南部领地"},
    {code: "TG", en: "Togo", cn: "多哥"},
    {code: "TH", en: "Thailand", cn: "泰国"},
    {code: "TJ", en: "Tajikistan", cn: "塔吉克斯坦"},
    {code: "TK", en: "Tokelau", cn: "托克劳"},
    {code: "TL", en: "Timor-Leste (East Timor)", cn: "东帝汶"},
    {code: "TM", en: "Turkmenistan", cn: "土库曼斯坦"},
    {code: "TN", en: "Tunisia", cn: "突尼斯"},
    {code: "TO", en: "Tonga", cn: "汤加"},
    {code: "TR", en: "Turkey", cn: "土耳其"},
    {code: "TT", en: "Trinidad & Tobago", cn: "特立尼达和多巴哥"},
    {code: "TV", en: "Tuvalu", cn: "图瓦卢"},
    {code: "TZ", en: "Tanzania", cn: "坦桑尼亚"},
    {code: "UA", en: "Ukraine", cn: "乌克兰"},
    {code: "UG", en: "Uganda", cn: "乌干达"},
    {code: "UM", en: "United States Minor Outlying Islands", cn: "美国本土外小岛屿"},
    {code: "UY", en: "Uruguay", cn: "乌拉圭"},
    {code: "UZ", en: "Uzbekistan", cn: "乌兹别克斯坦"},
    {code: "VA", en: "Vatican City (The Holy See)", cn: "梵蒂冈"},
    {code: "VC", en: "St. Vincent & the Grenadines", cn: "圣文森特和格林纳丁斯"},
    {code: "VE", en: "Venezuela", cn: "委内瑞拉"},
    {code: "VG", en: "British Virgin Islands", cn: "英属维尔京群岛"},
    {code: "VI", en: "United States Virgin Islands", cn: "美属维尔京群岛"},
    {code: "VN", en: "Vietnam", cn: "越南"},
    {code: "VU", en: "Vanuatu", cn: "瓦努阿图"},
    {code: "WF", en: "Wallis and Futuna", cn: "瓦利斯和富图纳"},
    {code: "WS", en: "Samoa", cn: "萨摩亚"},
    {code: "YE", en: "Yemen", cn: "也门"},
    {code: "YT", en: "Mayotte", cn: "马约特"},
    {code: "ZA", en: "South Africa", cn: "南非"},
    {code: "ZM", en: "Zambia", cn: "赞比亚"},
    {code: "ZW", en: "Zimbabwe", cn: "津巴布韦"}
];

var cities = {
    "100007":[
        {
            "name": "香港",
            "province": "香港",
            "id": "110100"
        },
    ],
    "100008":[
        {
            "name": "台湾",
            "province": "台湾",
            "id": "110100"
        },
    ],
    "100009":[
        {
            "name": "澳门",
            "province": "澳门",
            "id": "110100"
        },
    ],
    "110000": [
        {
            "name": "市辖区",
            "province": "北京市",
            "id": "110100"
        },
    ],
    "120000": [
        {
            "name": "市辖区",
            "province": "天津市",
            "id": "120100",
        },
    ],
    "130000": [
        {
            "name": "石家庄市",
            "province": "河北省",
            "id": "130100"
        },
        {
            "name": "唐山市",
            "province": "河北省",
            "id": "130200"
        },
        {
            "name": "秦皇岛市",
            "province": "河北省",
            "id": "130300"
        },
        {
            "name": "邯郸市",
            "province": "河北省",
            "id": "130400"
        },
        {
            "name": "邢台市",
            "province": "河北省",
            "id": "130500"
        },
        {
            "name": "保定市",
            "province": "河北省",
            "id": "130600"
        },
        {
            "name": "张家口市",
            "province": "河北省",
            "id": "130700"
        },
        {
            "name": "承德市",
            "province": "河北省",
            "id": "130800"
        },
        {
            "name": "沧州市",
            "province": "河北省",
            "id": "130900"
        },
        {
            "name": "廊坊市",
            "province": "河北省",
            "id": "131000"
        },
        {
            "name": "衡水市",
            "province": "河北省",
            "id": "131100"
        }
    ],
    "140000": [
        {
            "name": "太原市",
            "province": "山西省",
            "id": "140100"
        },
        {
            "name": "大同市",
            "province": "山西省",
            "id": "140200"
        },
        {
            "name": "阳泉市",
            "province": "山西省",
            "id": "140300"
        },
        {
            "name": "长治市",
            "province": "山西省",
            "id": "140400"
        },
        {
            "name": "晋城市",
            "province": "山西省",
            "id": "140500"
        },
        {
            "name": "朔州市",
            "province": "山西省",
            "id": "140600"
        },
        {
            "name": "晋中市",
            "province": "山西省",
            "id": "140700"
        },
        {
            "name": "运城市",
            "province": "山西省",
            "id": "140800"
        },
        {
            "name": "忻州市",
            "province": "山西省",
            "id": "140900"
        },
        {
            "name": "临汾市",
            "province": "山西省",
            "id": "141000"
        },
        {
            "name": "吕梁市",
            "province": "山西省",
            "id": "141100"
        }
    ],
    "150000": [
        {
            "name": "呼和浩特市",
            "province": "内蒙古自治区",
            "id": "150100"
        },
        {
            "name": "包头市",
            "province": "内蒙古自治区",
            "id": "150200"
        },
        {
            "name": "乌海市",
            "province": "内蒙古自治区",
            "id": "150300"
        },
        {
            "name": "赤峰市",
            "province": "内蒙古自治区",
            "id": "150400"
        },
        {
            "name": "通辽市",
            "province": "内蒙古自治区",
            "id": "150500"
        },
        {
            "name": "鄂尔多斯市",
            "province": "内蒙古自治区",
            "id": "150600"
        },
        {
            "name": "呼伦贝尔市",
            "province": "内蒙古自治区",
            "id": "150700"
        },
        {
            "name": "巴彦淖尔市",
            "province": "内蒙古自治区",
            "id": "150800"
        },
        {
            "name": "乌兰察布市",
            "province": "内蒙古自治区",
            "id": "150900"
        },
        {
            "name": "兴安盟",
            "province": "内蒙古自治区",
            "id": "152200"
        },
        {
            "name": "锡林郭勒盟",
            "province": "内蒙古自治区",
            "id": "152500"
        },
        {
            "name": "阿拉善盟",
            "province": "内蒙古自治区",
            "id": "152900"
        }
    ],
    "210000": [
        {
            "name": "沈阳市",
            "province": "辽宁省",
            "id": "210100"
        },
        {
            "name": "大连市",
            "province": "辽宁省",
            "id": "210200"
        },
        {
            "name": "鞍山市",
            "province": "辽宁省",
            "id": "210300"
        },
        {
            "name": "抚顺市",
            "province": "辽宁省",
            "id": "210400"
        },
        {
            "name": "本溪市",
            "province": "辽宁省",
            "id": "210500"
        },
        {
            "name": "丹东市",
            "province": "辽宁省",
            "id": "210600"
        },
        {
            "name": "锦州市",
            "province": "辽宁省",
            "id": "210700"
        },
        {
            "name": "营口市",
            "province": "辽宁省",
            "id": "210800"
        },
        {
            "name": "阜新市",
            "province": "辽宁省",
            "id": "210900"
        },
        {
            "name": "辽阳市",
            "province": "辽宁省",
            "id": "211000"
        },
        {
            "name": "盘锦市",
            "province": "辽宁省",
            "id": "211100"
        },
        {
            "name": "铁岭市",
            "province": "辽宁省",
            "id": "211200"
        },
        {
            "name": "朝阳市",
            "province": "辽宁省",
            "id": "211300"
        },
        {
            "name": "葫芦岛市",
            "province": "辽宁省",
            "id": "211400"
        }
    ],
    "220000": [
        {
            "name": "长春市",
            "province": "吉林省",
            "id": "220100"
        },
        {
            "name": "吉林市",
            "province": "吉林省",
            "id": "220200"
        },
        {
            "name": "四平市",
            "province": "吉林省",
            "id": "220300"
        },
        {
            "name": "辽源市",
            "province": "吉林省",
            "id": "220400"
        },
        {
            "name": "通化市",
            "province": "吉林省",
            "id": "220500"
        },
        {
            "name": "白山市",
            "province": "吉林省",
            "id": "220600"
        },
        {
            "name": "松原市",
            "province": "吉林省",
            "id": "220700"
        },
        {
            "name": "白城市",
            "province": "吉林省",
            "id": "220800"
        },
        {
            "name": "延边朝鲜族自治州",
            "province": "吉林省",
            "id": "222400"
        }
    ],
    "230000": [
        {
            "name": "哈尔滨市",
            "province": "黑龙江省",
            "id": "230100"
        },
        {
            "name": "齐齐哈尔市",
            "province": "黑龙江省",
            "id": "230200"
        },
        {
            "name": "鸡西市",
            "province": "黑龙江省",
            "id": "230300"
        },
        {
            "name": "鹤岗市",
            "province": "黑龙江省",
            "id": "230400"
        },
        {
            "name": "双鸭山市",
            "province": "黑龙江省",
            "id": "230500"
        },
        {
            "name": "大庆市",
            "province": "黑龙江省",
            "id": "230600"
        },
        {
            "name": "伊春市",
            "province": "黑龙江省",
            "id": "230700"
        },
        {
            "name": "佳木斯市",
            "province": "黑龙江省",
            "id": "230800"
        },
        {
            "name": "七台河市",
            "province": "黑龙江省",
            "id": "230900"
        },
        {
            "name": "牡丹江市",
            "province": "黑龙江省",
            "id": "231000"
        },
        {
            "name": "黑河市",
            "province": "黑龙江省",
            "id": "231100"
        },
        {
            "name": "绥化市",
            "province": "黑龙江省",
            "id": "231200"
        },
        {
            "name": "大兴安岭地区",
            "province": "黑龙江省",
            "id": "232700"
        }
    ],
    "310000": [
        {
            "name": "市辖区",
            "province": "上海市",
            "id": "310100"
        },
    ],
    "320000": [
        {
            "name": "南京市",
            "province": "江苏省",
            "id": "320100"
        },
        {
            "name": "无锡市",
            "province": "江苏省",
            "id": "320200"
        },
        {
            "name": "徐州市",
            "province": "江苏省",
            "id": "320300"
        },
        {
            "name": "常州市",
            "province": "江苏省",
            "id": "320400"
        },
        {
            "name": "苏州市",
            "province": "江苏省",
            "id": "320500"
        },
        {
            "name": "南通市",
            "province": "江苏省",
            "id": "320600"
        },
        {
            "name": "连云港市",
            "province": "江苏省",
            "id": "320700"
        },
        {
            "name": "淮安市",
            "province": "江苏省",
            "id": "320800"
        },
        {
            "name": "盐城市",
            "province": "江苏省",
            "id": "320900"
        },
        {
            "name": "扬州市",
            "province": "江苏省",
            "id": "321000"
        },
        {
            "name": "镇江市",
            "province": "江苏省",
            "id": "321100"
        },
        {
            "name": "泰州市",
            "province": "江苏省",
            "id": "321200"
        },
        {
            "name": "宿迁市",
            "province": "江苏省",
            "id": "321300"
        }
    ],
    "330000": [
        {
            "name": "杭州市",
            "province": "浙江省",
            "id": "330100"
        },
        {
            "name": "宁波市",
            "province": "浙江省",
            "id": "330200"
        },
        {
            "name": "温州市",
            "province": "浙江省",
            "id": "330300"
        },
        {
            "name": "嘉兴市",
            "province": "浙江省",
            "id": "330400"
        },
        {
            "name": "湖州市",
            "province": "浙江省",
            "id": "330500"
        },
        {
            "name": "绍兴市",
            "province": "浙江省",
            "id": "330600"
        },
        {
            "name": "金华市",
            "province": "浙江省",
            "id": "330700"
        },
        {
            "name": "衢州市",
            "province": "浙江省",
            "id": "330800"
        },
        {
            "name": "舟山市",
            "province": "浙江省",
            "id": "330900"
        },
        {
            "name": "台州市",
            "province": "浙江省",
            "id": "331000"
        },
        {
            "name": "丽水市",
            "province": "浙江省",
            "id": "331100"
        }
    ],
    "340000": [
        {
            "name": "合肥市",
            "province": "安徽省",
            "id": "340100"
        },
        {
            "name": "芜湖市",
            "province": "安徽省",
            "id": "340200"
        },
        {
            "name": "蚌埠市",
            "province": "安徽省",
            "id": "340300"
        },
        {
            "name": "淮南市",
            "province": "安徽省",
            "id": "340400"
        },
        {
            "name": "马鞍山市",
            "province": "安徽省",
            "id": "340500"
        },
        {
            "name": "淮北市",
            "province": "安徽省",
            "id": "340600"
        },
        {
            "name": "铜陵市",
            "province": "安徽省",
            "id": "340700"
        },
        {
            "name": "安庆市",
            "province": "安徽省",
            "id": "340800"
        },
        {
            "name": "黄山市",
            "province": "安徽省",
            "id": "341000"
        },
        {
            "name": "滁州市",
            "province": "安徽省",
            "id": "341100"
        },
        {
            "name": "阜阳市",
            "province": "安徽省",
            "id": "341200"
        },
        {
            "name": "宿州市",
            "province": "安徽省",
            "id": "341300"
        },
        {
            "name": "巢湖市",
            "province": "安徽省",
            "id": "341400"
        },
        {
            "name": "六安市",
            "province": "安徽省",
            "id": "341500"
        },
        {
            "name": "亳州市",
            "province": "安徽省",
            "id": "341600"
        },
        {
            "name": "池州市",
            "province": "安徽省",
            "id": "341700"
        },
        {
            "name": "宣城市",
            "province": "安徽省",
            "id": "341800"
        }
    ],
    "350000": [
        {
            "name": "福州市",
            "province": "福建省",
            "id": "350100"
        },
        {
            "name": "厦门市",
            "province": "福建省",
            "id": "350200"
        },
        {
            "name": "莆田市",
            "province": "福建省",
            "id": "350300"
        },
        {
            "name": "三明市",
            "province": "福建省",
            "id": "350400"
        },
        {
            "name": "泉州市",
            "province": "福建省",
            "id": "350500"
        },
        {
            "name": "漳州市",
            "province": "福建省",
            "id": "350600"
        },
        {
            "name": "南平市",
            "province": "福建省",
            "id": "350700"
        },
        {
            "name": "龙岩市",
            "province": "福建省",
            "id": "350800"
        },
        {
            "name": "宁德市",
            "province": "福建省",
            "id": "350900"
        }
    ],
    "360000": [
        {
            "name": "南昌市",
            "province": "江西省",
            "id": "360100"
        },
        {
            "name": "景德镇市",
            "province": "江西省",
            "id": "360200"
        },
        {
            "name": "萍乡市",
            "province": "江西省",
            "id": "360300"
        },
        {
            "name": "九江市",
            "province": "江西省",
            "id": "360400"
        },
        {
            "name": "新余市",
            "province": "江西省",
            "id": "360500"
        },
        {
            "name": "鹰潭市",
            "province": "江西省",
            "id": "360600"
        },
        {
            "name": "赣州市",
            "province": "江西省",
            "id": "360700"
        },
        {
            "name": "吉安市",
            "province": "江西省",
            "id": "360800"
        },
        {
            "name": "宜春市",
            "province": "江西省",
            "id": "360900"
        },
        {
            "name": "抚州市",
            "province": "江西省",
            "id": "361000"
        },
        {
            "name": "上饶市",
            "province": "江西省",
            "id": "361100"
        }
    ],
    "370000": [
        {
            "name": "济南市",
            "province": "山东省",
            "id": "370100"
        },
        {
            "name": "青岛市",
            "province": "山东省",
            "id": "370200"
        },
        {
            "name": "淄博市",
            "province": "山东省",
            "id": "370300"
        },
        {
            "name": "枣庄市",
            "province": "山东省",
            "id": "370400"
        },
        {
            "name": "东营市",
            "province": "山东省",
            "id": "370500"
        },
        {
            "name": "烟台市",
            "province": "山东省",
            "id": "370600"
        },
        {
            "name": "潍坊市",
            "province": "山东省",
            "id": "370700"
        },
        {
            "name": "济宁市",
            "province": "山东省",
            "id": "370800"
        },
        {
            "name": "泰安市",
            "province": "山东省",
            "id": "370900"
        },
        {
            "name": "威海市",
            "province": "山东省",
            "id": "371000"
        },
        {
            "name": "日照市",
            "province": "山东省",
            "id": "371100"
        },
        {
            "name": "莱芜市",
            "province": "山东省",
            "id": "371200"
        },
        {
            "name": "临沂市",
            "province": "山东省",
            "id": "371300"
        },
        {
            "name": "德州市",
            "province": "山东省",
            "id": "371400"
        },
        {
            "name": "聊城市",
            "province": "山东省",
            "id": "371500"
        },
        {
            "name": "滨州市",
            "province": "山东省",
            "id": "371600"
        },
        {
            "name": "荷泽市",
            "province": "山东省",
            "id": "371700"
        }
    ],
    "410000": [
        {
            "name": "郑州市",
            "province": "河南省",
            "id": "410100"
        },
        {
            "name": "开封市",
            "province": "河南省",
            "id": "410200"
        },
        {
            "name": "洛阳市",
            "province": "河南省",
            "id": "410300"
        },
        {
            "name": "平顶山市",
            "province": "河南省",
            "id": "410400"
        },
        {
            "name": "安阳市",
            "province": "河南省",
            "id": "410500"
        },
        {
            "name": "鹤壁市",
            "province": "河南省",
            "id": "410600"
        },
        {
            "name": "新乡市",
            "province": "河南省",
            "id": "410700"
        },
        {
            "name": "焦作市",
            "province": "河南省",
            "id": "410800"
        },
        {
            "name": "濮阳市",
            "province": "河南省",
            "id": "410900"
        },
        {
            "name": "许昌市",
            "province": "河南省",
            "id": "411000"
        },
        {
            "name": "漯河市",
            "province": "河南省",
            "id": "411100"
        },
        {
            "name": "三门峡市",
            "province": "河南省",
            "id": "411200"
        },
        {
            "name": "南阳市",
            "province": "河南省",
            "id": "411300"
        },
        {
            "name": "商丘市",
            "province": "河南省",
            "id": "411400"
        },
        {
            "name": "信阳市",
            "province": "河南省",
            "id": "411500"
        },
        {
            "name": "周口市",
            "province": "河南省",
            "id": "411600"
        },
        {
            "name": "驻马店市",
            "province": "河南省",
            "id": "411700"
        }
    ],
    "420000": [
        {
            "name": "武汉市",
            "province": "湖北省",
            "id": "420100"
        },
        {
            "name": "黄石市",
            "province": "湖北省",
            "id": "420200"
        },
        {
            "name": "十堰市",
            "province": "湖北省",
            "id": "420300"
        },
        {
            "name": "宜昌市",
            "province": "湖北省",
            "id": "420500"
        },
        {
            "name": "襄樊市",
            "province": "湖北省",
            "id": "420600"
        },
        {
            "name": "鄂州市",
            "province": "湖北省",
            "id": "420700"
        },
        {
            "name": "荆门市",
            "province": "湖北省",
            "id": "420800"
        },
        {
            "name": "孝感市",
            "province": "湖北省",
            "id": "420900"
        },
        {
            "name": "荆州市",
            "province": "湖北省",
            "id": "421000"
        },
        {
            "name": "黄冈市",
            "province": "湖北省",
            "id": "421100"
        },
        {
            "name": "咸宁市",
            "province": "湖北省",
            "id": "421200"
        },
        {
            "name": "随州市",
            "province": "湖北省",
            "id": "421300"
        },
        {
            "name": "恩施土家族苗族自治州",
            "province": "湖北省",
            "id": "422800"
        },
        {
            "name": "省直辖行政单位",
            "province": "湖北省",
            "id": "429000"
        }
    ],
    "430000": [
        {
            "name": "长沙市",
            "province": "湖南省",
            "id": "430100"
        },
        {
            "name": "株洲市",
            "province": "湖南省",
            "id": "430200"
        },
        {
            "name": "湘潭市",
            "province": "湖南省",
            "id": "430300"
        },
        {
            "name": "衡阳市",
            "province": "湖南省",
            "id": "430400"
        },
        {
            "name": "邵阳市",
            "province": "湖南省",
            "id": "430500"
        },
        {
            "name": "岳阳市",
            "province": "湖南省",
            "id": "430600"
        },
        {
            "name": "常德市",
            "province": "湖南省",
            "id": "430700"
        },
        {
            "name": "张家界市",
            "province": "湖南省",
            "id": "430800"
        },
        {
            "name": "益阳市",
            "province": "湖南省",
            "id": "430900"
        },
        {
            "name": "郴州市",
            "province": "湖南省",
            "id": "431000"
        },
        {
            "name": "永州市",
            "province": "湖南省",
            "id": "431100"
        },
        {
            "name": "怀化市",
            "province": "湖南省",
            "id": "431200"
        },
        {
            "name": "娄底市",
            "province": "湖南省",
            "id": "431300"
        },
        {
            "name": "湘西土家族苗族自治州",
            "province": "湖南省",
            "id": "433100"
        }
    ],
    "440000": [
        {
            "name": "广州市",
            "province": "广东省",
            "id": "440100"
        },
        {
            "name": "韶关市",
            "province": "广东省",
            "id": "440200"
        },
        {
            "name": "深圳市",
            "province": "广东省",
            "id": "440300"
        },
        {
            "name": "珠海市",
            "province": "广东省",
            "id": "440400"
        },
        {
            "name": "汕头市",
            "province": "广东省",
            "id": "440500"
        },
        {
            "name": "佛山市",
            "province": "广东省",
            "id": "440600"
        },
        {
            "name": "江门市",
            "province": "广东省",
            "id": "440700"
        },
        {
            "name": "湛江市",
            "province": "广东省",
            "id": "440800"
        },
        {
            "name": "茂名市",
            "province": "广东省",
            "id": "440900"
        },
        {
            "name": "肇庆市",
            "province": "广东省",
            "id": "441200"
        },
        {
            "name": "惠州市",
            "province": "广东省",
            "id": "441300"
        },
        {
            "name": "梅州市",
            "province": "广东省",
            "id": "441400"
        },
        {
            "name": "汕尾市",
            "province": "广东省",
            "id": "441500"
        },
        {
            "name": "河源市",
            "province": "广东省",
            "id": "441600"
        },
        {
            "name": "阳江市",
            "province": "广东省",
            "id": "441700"
        },
        {
            "name": "清远市",
            "province": "广东省",
            "id": "441800"
        },
        {
            "name": "东莞市",
            "province": "广东省",
            "id": "441900"
        },
        {
            "name": "中山市",
            "province": "广东省",
            "id": "442000"
        },
        {
            "name": "潮州市",
            "province": "广东省",
            "id": "445100"
        },
        {
            "name": "揭阳市",
            "province": "广东省",
            "id": "445200"
        },
        {
            "name": "云浮市",
            "province": "广东省",
            "id": "445300"
        }
    ],
    "450000": [
        {
            "name": "南宁市",
            "province": "广西壮族自治区",
            "id": "450100"
        },
        {
            "name": "柳州市",
            "province": "广西壮族自治区",
            "id": "450200"
        },
        {
            "name": "桂林市",
            "province": "广西壮族自治区",
            "id": "450300"
        },
        {
            "name": "梧州市",
            "province": "广西壮族自治区",
            "id": "450400"
        },
        {
            "name": "北海市",
            "province": "广西壮族自治区",
            "id": "450500"
        },
        {
            "name": "防城港市",
            "province": "广西壮族自治区",
            "id": "450600"
        },
        {
            "name": "钦州市",
            "province": "广西壮族自治区",
            "id": "450700"
        },
        {
            "name": "贵港市",
            "province": "广西壮族自治区",
            "id": "450800"
        },
        {
            "name": "玉林市",
            "province": "广西壮族自治区",
            "id": "450900"
        },
        {
            "name": "百色市",
            "province": "广西壮族自治区",
            "id": "451000"
        },
        {
            "name": "贺州市",
            "province": "广西壮族自治区",
            "id": "451100"
        },
        {
            "name": "河池市",
            "province": "广西壮族自治区",
            "id": "451200"
        },
        {
            "name": "来宾市",
            "province": "广西壮族自治区",
            "id": "451300"
        },
        {
            "name": "崇左市",
            "province": "广西壮族自治区",
            "id": "451400"
        }
    ],
    "460000": [
        {
            "name": "海口市",
            "province": "海南省",
            "id": "460100"
        },
        {
            "name": "三亚市",
            "province": "海南省",
            "id": "460200"
        },
        {
            "name": "省直辖县级行政单位",
            "province": "海南省",
            "id": "469000"
        }
    ],
    "500000": [
        {
            "name": "市辖区",
            "province": "重庆市",
            "id": "500100"
        },
        {
            "name": "县",
            "province": "重庆市",
            "id": "500200"
        },
        {
            "name": "市",
            "province": "重庆市",
            "id": "500300"
        }
    ],
    "510000": [
        {
            "name": "成都市",
            "province": "四川省",
            "id": "510100"
        },
        {
            "name": "自贡市",
            "province": "四川省",
            "id": "510300"
        },
        {
            "name": "攀枝花市",
            "province": "四川省",
            "id": "510400"
        },
        {
            "name": "泸州市",
            "province": "四川省",
            "id": "510500"
        },
        {
            "name": "德阳市",
            "province": "四川省",
            "id": "510600"
        },
        {
            "name": "绵阳市",
            "province": "四川省",
            "id": "510700"
        },
        {
            "name": "广元市",
            "province": "四川省",
            "id": "510800"
        },
        {
            "name": "遂宁市",
            "province": "四川省",
            "id": "510900"
        },
        {
            "name": "内江市",
            "province": "四川省",
            "id": "511000"
        },
        {
            "name": "乐山市",
            "province": "四川省",
            "id": "511100"
        },
        {
            "name": "南充市",
            "province": "四川省",
            "id": "511300"
        },
        {
            "name": "眉山市",
            "province": "四川省",
            "id": "511400"
        },
        {
            "name": "宜宾市",
            "province": "四川省",
            "id": "511500"
        },
        {
            "name": "广安市",
            "province": "四川省",
            "id": "511600"
        },
        {
            "name": "达州市",
            "province": "四川省",
            "id": "511700"
        },
        {
            "name": "雅安市",
            "province": "四川省",
            "id": "511800"
        },
        {
            "name": "巴中市",
            "province": "四川省",
            "id": "511900"
        },
        {
            "name": "资阳市",
            "province": "四川省",
            "id": "512000"
        },
        {
            "name": "阿坝藏族羌族自治州",
            "province": "四川省",
            "id": "513200"
        },
        {
            "name": "甘孜藏族自治州",
            "province": "四川省",
            "id": "513300"
        },
        {
            "name": "凉山彝族自治州",
            "province": "四川省",
            "id": "513400"
        }
    ],
    "520000": [
        {
            "name": "贵阳市",
            "province": "贵州省",
            "id": "520100"
        },
        {
            "name": "六盘水市",
            "province": "贵州省",
            "id": "520200"
        },
        {
            "name": "遵义市",
            "province": "贵州省",
            "id": "520300"
        },
        {
            "name": "安顺市",
            "province": "贵州省",
            "id": "520400"
        },
        {
            "name": "铜仁地区",
            "province": "贵州省",
            "id": "522200"
        },
        {
            "name": "黔西南布依族苗族自治州",
            "province": "贵州省",
            "id": "522300"
        },
        {
            "name": "毕节地区",
            "province": "贵州省",
            "id": "522400"
        },
        {
            "name": "黔东南苗族侗族自治州",
            "province": "贵州省",
            "id": "522600"
        },
        {
            "name": "黔南布依族苗族自治州",
            "province": "贵州省",
            "id": "522700"
        }
    ],
    "530000": [
        {
            "name": "昆明市",
            "province": "云南省",
            "id": "530100"
        },
        {
            "name": "曲靖市",
            "province": "云南省",
            "id": "530300"
        },
        {
            "name": "玉溪市",
            "province": "云南省",
            "id": "530400"
        },
        {
            "name": "保山市",
            "province": "云南省",
            "id": "530500"
        },
        {
            "name": "昭通市",
            "province": "云南省",
            "id": "530600"
        },
        {
            "name": "丽江市",
            "province": "云南省",
            "id": "530700"
        },
        {
            "name": "思茅市",
            "province": "云南省",
            "id": "530800"
        },
        {
            "name": "临沧市",
            "province": "云南省",
            "id": "530900"
        },
        {
            "name": "楚雄彝族自治州",
            "province": "云南省",
            "id": "532300"
        },
        {
            "name": "红河哈尼族彝族自治州",
            "province": "云南省",
            "id": "532500"
        },
        {
            "name": "文山壮族苗族自治州",
            "province": "云南省",
            "id": "532600"
        },
        {
            "name": "西双版纳傣族自治州",
            "province": "云南省",
            "id": "532800"
        },
        {
            "name": "大理白族自治州",
            "province": "云南省",
            "id": "532900"
        },
        {
            "name": "德宏傣族景颇族自治州",
            "province": "云南省",
            "id": "533100"
        },
        {
            "name": "怒江傈僳族自治州",
            "province": "云南省",
            "id": "533300"
        },
        {
            "name": "迪庆藏族自治州",
            "province": "云南省",
            "id": "533400"
        }
    ],
    "540000": [
        {
            "name": "拉萨市",
            "province": "西藏自治区",
            "id": "540100"
        },
        {
            "name": "昌都地区",
            "province": "西藏自治区",
            "id": "542100"
        },
        {
            "name": "山南地区",
            "province": "西藏自治区",
            "id": "542200"
        },
        {
            "name": "日喀则地区",
            "province": "西藏自治区",
            "id": "542300"
        },
        {
            "name": "那曲地区",
            "province": "西藏自治区",
            "id": "542400"
        },
        {
            "name": "阿里地区",
            "province": "西藏自治区",
            "id": "542500"
        },
        {
            "name": "林芝地区",
            "province": "西藏自治区",
            "id": "542600"
        }
    ],
    "610000": [
        {
            "name": "西安市",
            "province": "陕西省",
            "id": "610100"
        },
        {
            "name": "铜川市",
            "province": "陕西省",
            "id": "610200"
        },
        {
            "name": "宝鸡市",
            "province": "陕西省",
            "id": "610300"
        },
        {
            "name": "咸阳市",
            "province": "陕西省",
            "id": "610400"
        },
        {
            "name": "渭南市",
            "province": "陕西省",
            "id": "610500"
        },
        {
            "name": "延安市",
            "province": "陕西省",
            "id": "610600"
        },
        {
            "name": "汉中市",
            "province": "陕西省",
            "id": "610700"
        },
        {
            "name": "榆林市",
            "province": "陕西省",
            "id": "610800"
        },
        {
            "name": "安康市",
            "province": "陕西省",
            "id": "610900"
        },
        {
            "name": "商洛市",
            "province": "陕西省",
            "id": "611000"
        }
    ],
    "620000": [
        {
            "name": "兰州市",
            "province": "甘肃省",
            "id": "620100"
        },
        {
            "name": "嘉峪关市",
            "province": "甘肃省",
            "id": "620200"
        },
        {
            "name": "金昌市",
            "province": "甘肃省",
            "id": "620300"
        },
        {
            "name": "白银市",
            "province": "甘肃省",
            "id": "620400"
        },
        {
            "name": "天水市",
            "province": "甘肃省",
            "id": "620500"
        },
        {
            "name": "武威市",
            "province": "甘肃省",
            "id": "620600"
        },
        {
            "name": "张掖市",
            "province": "甘肃省",
            "id": "620700"
        },
        {
            "name": "平凉市",
            "province": "甘肃省",
            "id": "620800"
        },
        {
            "name": "酒泉市",
            "province": "甘肃省",
            "id": "620900"
        },
        {
            "name": "庆阳市",
            "province": "甘肃省",
            "id": "621000"
        },
        {
            "name": "定西市",
            "province": "甘肃省",
            "id": "621100"
        },
        {
            "name": "陇南市",
            "province": "甘肃省",
            "id": "621200"
        },
        {
            "name": "临夏回族自治州",
            "province": "甘肃省",
            "id": "622900"
        },
        {
            "name": "甘南藏族自治州",
            "province": "甘肃省",
            "id": "623000"
        }
    ],
    "630000": [
        {
            "name": "西宁市",
            "province": "青海省",
            "id": "630100"
        },
        {
            "name": "海东地区",
            "province": "青海省",
            "id": "632100"
        },
        {
            "name": "海北藏族自治州",
            "province": "青海省",
            "id": "632200"
        },
        {
            "name": "黄南藏族自治州",
            "province": "青海省",
            "id": "632300"
        },
        {
            "name": "海南藏族自治州",
            "province": "青海省",
            "id": "632500"
        },
        {
            "name": "果洛藏族自治州",
            "province": "青海省",
            "id": "632600"
        },
        {
            "name": "玉树藏族自治州",
            "province": "青海省",
            "id": "632700"
        },
        {
            "name": "海西蒙古族藏族自治州",
            "province": "青海省",
            "id": "632800"
        }
    ],
    "640000": [
        {
            "name": "银川市",
            "province": "宁夏回族自治区",
            "id": "640100"
        },
        {
            "name": "石嘴山市",
            "province": "宁夏回族自治区",
            "id": "640200"
        },
        {
            "name": "吴忠市",
            "province": "宁夏回族自治区",
            "id": "640300"
        },
        {
            "name": "固原市",
            "province": "宁夏回族自治区",
            "id": "640400"
        },
        {
            "name": "中卫市",
            "province": "宁夏回族自治区",
            "id": "640500"
        }
    ],
    "650000": [
        {
            "name": "乌鲁木齐市",
            "province": "新疆维吾尔自治区",
            "id": "650100"
        },
        {
            "name": "克拉玛依市",
            "province": "新疆维吾尔自治区",
            "id": "650200"
        },
        {
            "name": "吐鲁番地区",
            "province": "新疆维吾尔自治区",
            "id": "652100"
        },
        {
            "name": "哈密地区",
            "province": "新疆维吾尔自治区",
            "id": "652200"
        },
        {
            "name": "昌吉回族自治州",
            "province": "新疆维吾尔自治区",
            "id": "652300"
        },
        {
            "name": "博尔塔拉蒙古自治州",
            "province": "新疆维吾尔自治区",
            "id": "652700"
        },
        {
            "name": "巴音郭楞蒙古自治州",
            "province": "新疆维吾尔自治区",
            "id": "652800"
        },
        {
            "name": "阿克苏地区",
            "province": "新疆维吾尔自治区",
            "id": "652900"
        },
        {
            "name": "克孜勒苏柯尔克孜自治州",
            "province": "新疆维吾尔自治区",
            "id": "653000"
        },
        {
            "name": "喀什地区",
            "province": "新疆维吾尔自治区",
            "id": "653100"
        },
        {
            "name": "和田地区",
            "province": "新疆维吾尔自治区",
            "id": "653200"
        },
        {
            "name": "伊犁哈萨克自治州",
            "province": "新疆维吾尔自治区",
            "id": "654000"
        },
        {
            "name": "塔城地区",
            "province": "新疆维吾尔自治区",
            "id": "654200"
        },
        {
            "name": "阿勒泰地区",
            "province": "新疆维吾尔自治区",
            "id": "654300"
        },
        {
            "name": "省直辖行政单位",
            "province": "新疆维吾尔自治区",
            "id": "659000"
        }
    ]
}

var final_result = []

var p_count = 1;


globalCountries.forEach(function (data) {
    data['id'] = p_count;
    if (data['code'] === 'CN') {
        data['cities'] = cities;
        final_result.push(data);
    } else {
        final_result.push(data)
    }
    p_count += 1;
})

fs.writeFile('aaa.json', JSON.stringify(final_result), function (err, data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
});
console.log(final_result);

