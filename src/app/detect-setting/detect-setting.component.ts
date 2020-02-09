import { Component, OnInit, ElementRef } from '@angular/core';
import { MdcSnackbarService, MdcDialogDirective } from '@blox/material';
import { FetchService } from '../fetch.service';
import { Router } from '@angular/router';
@Component({
    selector: 'app-detect-setting',
    templateUrl: './detect-setting.component.html',
    styleUrls: ['./detect-setting.component.scss']
})
export class DetectSetttingComponent implements OnInit {
    // tslint:disable: all
    ImageElement: HTMLImageElement;
    ImageLoaded: boolean;
    Canvas: HTMLCanvasElement;
    Ctx: CanvasRenderingContext2D;
    ImageData: ImageData;
    worker: Worker;
    InfoText: '等待处理';
    progress: 0;
    XBound = [];
    YBound = [];
    ItemImages = [];
    ItemImage: string = "";
    NumberImages = [];
    textColor: any;
    MaxFontSize: any;
    FontSize = 0;
    ModifyingItem = null;
    ModifyBuffer: any = { have: 0, delete: false };
    Modifying = { x: 0, y: 0 };
    ItemNames = { "0000": "这个位置识别不到物品", "2001": "基础作战记录", "2002": "初级作战记录", "2003": "中级作战记录", "2004": "高级作战记录", "3003": "赤金", "3105": "龙骨", "3112": "碳", "3113": "碳素", "3114": "碳素组", "3131": "基础加固建材", "3132": "进阶加固建材", "3133": "高级加固建材", "3141": "源石碎片", "3211": "先锋芯片", "3212": "先锋芯片组", "3213": "先锋双芯片", "3221": "近卫芯片", "3222": "近卫芯片组", "3223": "近卫双芯片", "3231": "重装芯片", "3232": "重装芯片组", "3233": "重装双芯片", "3241": "狙击芯片", "3242": "狙击芯片组", "3243": "狙击双芯片", "3251": "术师芯片", "3252": "术师芯片组", "3253": "术师双芯片", "3261": "医疗芯片", "3262": "医疗芯片组", "3263": "医疗双芯片", "3271": "辅助芯片", "3272": "辅助芯片组", "3273": "辅助双芯片", "3281": "特种芯片", "3282": "特种芯片组", "3283": "特种双芯片", "3301": "技巧概要·卷1", "3302": "技巧概要·卷2", "3303": "技巧概要·卷3", "3401": "家具零件", "4001": "龙门币", "4002": "至纯源石", "4003": "合成玉", "4004": "高级凭证", "4005": "资质凭证", "4006": "采购凭证", "5001": "声望", "6001": "演习券", "7001": "招聘许可", "7002": "加急许可", "7003": "寻访凭证", "7004": "十连寻访凭证", "30011": "源岩", "30012": "固源岩", "30013": "固源岩组", "30014": "提纯源岩", "30021": "代糖", "30022": "糖", "30023": "糖组", "30024": "糖聚块", "30031": "酯原料", "30032": "聚酸酯", "30033": "聚酸酯组", "30034": "聚酸酯块", "30041": "异铁碎片", "30042": "异铁", "30043": "异铁组", "30044": "异铁块", "30051": "双酮", "30052": "酮凝集", "30053": "酮凝集组", "30054": "酮阵列", "30061": "破损装置", "30062": "装置", "30063": "全新装置", "30064": "改量装置", "30073": "扭转醇", "30074": "白马醇", "30083": "轻锰矿", "30084": "三水锰矿", "30093": "研磨石", "30094": "五水研磨石", "30103": "RMA70-12", "30104": "RMA70-24", "30115": "聚合剂", "30125": "双极纳米片", "30135": "D32钢", "31013": "凝胶", "31014": "聚合凝胶", "31023": "炽合金", "31024": "炽合金块", "32001": "芯片助剂", "SOCIAL_PT": "信用", "AP_GAMEPLAY": "理智", "base_ap": "无人机", "tier1_pioneer": "先锋信物复制品", "tier1_guard": "近卫信物复制品", "tier1_sniper": "狙击信物复制品", "tier1_tank": "重装信物复制品", "tier1_medic": "医疗信物复制品", "tier1_supporter": "辅助信物复制品", "tier1_caster": "术师信物复制品", "tier1_special": "特种信物复制品", "tier2_pioneer": "先锋信物原件", "tier2_guard": "近卫信物原件", "tier2_sniper": "狙击信物原件", "tier2_tank": "重装信物原件", "tier2_medic": "医疗信物原件", "tier2_supporter": "辅助信物原件", "tier2_caster": "术师信物原件", "tier2_special": "特种信物原件", "tier3_pioneer": "先锋信物藏品", "tier3_guard": "近卫信物藏品", "tier3_sniper": "狙击信物藏品", "tier3_tank": "重装信物藏品", "tier3_medic": "医疗信物藏品", "tier3_supporter": "辅助信物藏品", "tier3_caster": "术师信物藏品", "tier3_special": "特种信物藏品", "tier4_pioneer": "先锋传承信物", "tier4_guard": "近卫传承信物", "tier4_sniper": "狙击传承信物", "tier4_tank": "重装传承信物", "tier4_medic": "医疗传承信物", "tier4_supporter": "辅助传承信物", "tier4_caster": "术师传承信物", "tier4_special": "特种传承信物", "tier5_pioneer": "先锋遗产信物", "tier5_guard": "近卫遗产信物", "tier5_sniper": "狙击遗产信物", "tier5_tank": "重装遗产信物", "tier5_medic": "医疗遗产信物", "tier5_supporter": "辅助遗产信物", "tier5_caster": "术师遗产信物", "tier5_special": "特种遗产信物", "tier6_pioneer": "先锋皇家信物", "tier6_guard": "近卫皇家信物", "tier6_sniper": "狙击皇家信物", "tier6_tank": "重装皇家信物", "tier6_medic": "医疗皇家信物", "tier6_supporter": "辅助皇家信物", "tier6_caster": "术师皇家信物", "tier6_special": "特种皇家信物", "p_char_285_medic2": "Lancet-2的信物", "p_char_286_cast3": "Castle-3的信物", "p_char_502_nblade": "夜刀的信物", "p_char_500_noirc": "黑角的信物", "p_char_503_rang": "巡林者的信物", "p_char_501_durin": "杜林的信物", "p_char_009_12fce": "12F的信物", "p_char_123_fang": "芬的信物", "p_char_240_wyvern": "香草的信物", "p_char_192_falco": "翎羽的信物", "p_char_208_melan": "玫兰莎的信物", "p_char_209_ardign": "卡缇的信物", "p_char_122_beagle": "米格鲁的信物", "p_char_124_kroos": "克洛丝的信物", "p_char_211_adnach": "安德切尔的信物", "p_char_121_lava": "炎熔的信物", "p_char_120_hibisc": "芙蓉的信物", "p_char_212_ansel": "安赛尔的信物", "p_char_210_stward": "史都华德的信物", "p_char_278_orchid": "梓兰的信物", "p_char_282_catap": "空爆的信物", "p_char_283_midn": "月见夜的信物", "p_char_284_spot": "斑点的信物", "p_char_281_popka": "泡普卡的信物", "p_char_141_nights": "夜烟的信物", "p_char_109_fmout": "远山的信物", "p_char_235_jesica": "杰西卡的信物", "p_char_126_shotst": "流星的信物", "p_char_118_yuki": "白雪的信物", "p_char_198_blackd": "讯使的信物", "p_char_149_scave": "清道夫的信物", "p_char_290_vigna": "红豆的信物", "p_char_130_doberm": "杜宾的信物", "p_char_289_gyuki": "缠丸的信物", "p_char_193_frostl": "霜叶的信物", "p_char_127_estell": "艾丝黛尔的信物", "p_char_185_frncat": "慕斯的信物", "p_char_237_gravel": "砾的信物", "p_char_236_rope": "暗索的信物", "p_char_117_myrrh": "末药的信物", "p_char_187_ccheal": "嘉维尔的信物", "p_char_181_flower": "调香师的信物", "p_char_199_yak": "角峰的信物", "p_char_150_snakek": "蛇屠箱的信物", "p_char_196_sunbr": "古米的信物", "p_char_110_deepcl": "深海色的信物", "p_char_183_skgoat": "地灵的信物", "p_char_277_sqrrel": "阿消的信物", "p_char_137_brownb": "猎蜂的信物", "p_char_253_greyy": "格雷伊的信物", "p_char_151_myrtle": "桃金娘的信物", "p_char_298_susuro": "苏苏洛的信物", "p_char_260_durnar": "坚雷的信物", "p_char_355_ethan": "伊桑的信物", "p_char_190_clour": "红云的信物", "p_char_133_mm": "梅的信物", "p_char_302_glaze": "安比尔的信物", "p_char_128_plosis": "白面鸮的信物", "p_char_115_headbr": "凛冬的信物", "p_char_102_texas": "德克萨斯的信物", "p_char_106_franka": "芙兰卡的信物", "p_char_155_tiger": "因陀罗的信物", "p_char_140_whitew": "拉普兰德的信物", "p_char_143_ghost": "幽灵鲨的信物", "p_char_129_bluep": "蓝毒的信物", "p_char_204_platnm": "白金的信物", "p_char_219_meteo": "陨星的信物", "p_char_002_amiya": "阿米娅的信物", "p_char_166_skfire": "天火的信物", "p_char_242_otter": "梅尔的信物", "p_char_108_silent": "赫默的信物", "p_char_171_bldsk": "华法琳的信物", "p_char_148_nearl": "临光的信物", "p_char_144_red": "红的信物", "p_char_107_liskam": "雷蛇的信物", "p_char_201_moeshd": "可颂的信物", "p_char_163_hpsts": "火神的信物", "p_char_145_prove": "普罗旺斯的信物", "p_char_158_milu": "守林人的信物", "p_char_173_slchan": "崖心的信物", "p_char_174_slbell": "初雪的信物", "p_char_195_glassb": "真理的信物", "p_char_101_sora": "空的信物", "p_char_215_mantic": "狮蝎的信物", "p_char_241_panda": "食铁兽的信物", "p_char_220_grani": "格拉尼的信物", "p_char_164_nightm": "夜魔的信物", "p_char_308_swire": "诗怀雅的信物", "p_char_274_astesi": "星极的信物", "p_char_348_ceylon": "锡兰的信物", "p_char_326_glacus": "格劳克斯的信物", "p_char_275_breeze": "微风的信物", "p_char_131_flameb": "炎客的信物", "p_char_279_excu": "送葬人的信物", "p_char_261_sddrag": "苇草的信物", "p_char_356_broca": "布洛卡的信物", "p_char_243_waaifu": "槐琥的信物", "p_char_325_bison": "拜松的信物", "p_char_367_swllow": "灰喉的信物", "p_char_226_hmau": "吽的信物", "p_char_383_snsant": "雪雉的信物", "p_char_103_angel": "能天使的信物", "p_char_112_siege": "推进之王的信物", "p_char_134_ifrit": "伊芙利特的信物", "p_char_180_amgoat": "艾雅法拉的信物", "p_char_291_aglina": "安洁莉娜的信物", "p_char_147_shining": "闪灵的信物", "p_char_179_cgbird": "夜莺的信物", "p_char_136_hsguma": "星熊的信物", "p_char_202_demkni": "塞雷娅的信物", "p_char_172_svrash": "银灰的信物", "p_char_263_skadi": "斯卡蒂的信物", "p_char_010_chen": "陈的信物", "p_char_340_shwaz": "黑的信物", "p_char_188_helage": "赫拉格的信物", "p_char_248_mgllan": "麦哲伦的信物", "p_char_213_mostma": "莫斯提马的信物", "p_char_225_haak": "阿的信物", "p_char_2014_nian": "年的信物", "p_char_017_huang": "煌的信物", "bilibili001": "预约干员随机4选1", "ap_item_amiya": "阿米娅的烧烤味饼干", "ap_item_chen": "陈的烧烤味饼干", "ap_item_texas": "德克萨斯的烧烤味饼干", "ap_item_doberm": "杜宾的烧烤味饼干", "ap_item_jesica": "杰西卡的烧烤味饼干", "ap_item_cast3": "Castle-3的烧烤味饼干", "ap_item_closure": "可露希尔的烧烤味饼干", "ap_item_catap": "空爆的烧烤味饼干", "ap_item_blackd": "讯使的烧烤味饼干", "ap_item_slchan": "崖心的烧烤味饼干", "ap_item_SEC_60": "咸蛋黄味巧克力", "ap_item_CaH_200": "双人汉堡餐", "1stact": "赏金猎人金币", "ap_supply_lt_010": "应急理智小样", "ap_supply_lt_60": "应急理智合剂", "ap_supply_lt_100": "应急理智顶液", "renamingCard": "ID信息更新卡", "token_Wristband": "黑曜石节手环", "et_ObsidianPass": "黑曜石节门票", "token_Obsidian": "汐斯塔的黑曜石", "token_ObsidianCoin": "黑曜石节抽奖代币", "clue_Heavymetal_1": "重金属动态1", "clue_Heavymetal_2": "重金属动态2", "clue_Heavymetal_3": "重金属动态3", "clue_Heavymetal_4": "重金属动态4", "clue_Heavymetal_5": "重金属动态5", "clue_EDM_1": "电音动态1", "clue_EDM_2": "电音动态2", "clue_EDM_3": "电音动态3", "clue_EDM_4": "电音动态4", "clue_EDM_5": "电音动态5", "clue_Rap_1": "说唱动态1", "clue_Rap_2": "说唱动态2", "clue_Rap_3": "说唱动态3", "clue_Rap_4": "说唱动态4", "clue_Rap_5": "说唱动态5", "act4d0_intelligencepoint": "有效情报值", "act4d5_point_kfc": "KFC积分", "act5d0_point_medal": "终极企鹅勋章", "act5d1_point_conbounty": "合约赏金", "act5d1_point_opagrt": "行动协议", "act6d5_point_firecracker": "量子二踢脚", "act6d8_point_token": "元宵通宝", "voucher_item_4pick1": "干员兑换券", "voucher_recruitR3_1": "公开招募★3兑换券·I", "voucher_recruitR4_1": "公开招募★4兑换券·I", "2020recruitment10_1": "α类新年寻访凭证", "2020recruitment10_2": "β类新年寻访凭证", "2020recruitment10_3": "γ类新年寻访凭证", "randomMaterial_1": "罗德岛物资补给", "randomMaterial_2": "岁过华灯", "randomDiamondShd_1": "罗德岛迎春红包" }
    detectedItem = [];
    Lock = false;
    ItemHashList: any = [];
    RecordItemHash = {};
    OriginHash = [];
    constructor(private fetchService: FetchService, private snackbar: MdcSnackbarService, private router: Router, private el: ElementRef) {
    }

    async ngOnInit() {
        this.ImageElement = document.createElement('img');
        this.Canvas = this.el.nativeElement.getElementsByTagName('canvas')[0];
        this.Ctx = this.Canvas.getContext('2d');
        this.MaxFontSize = this.fetchService.getLocalStorage('detect-mfs', true);
        this.textColor = this.fetchService.getLocalStorage('detect-tclr', '#00ff00');
        this.onPasteImage();
        this.registerWorker();
    }
    Copy(input) {
        input.select();
        if (document.execCommand('copy')) {
            this.snackbar.show({
                message: '复制成功',
                actionText: '好的',
                multiline: false,
                actionOnBottom: false
            });
        }
    }
    Import(input){
        localStorage.setItem("detect-setting", input.value);
        this.ItemHashList = JSON.parse(localStorage.getItem("detect-setting")) || (Boolean(localStorage.setItem("detect-setting", JSON.stringify(this.ItemHashList))) || this.ItemHashList);
        this.reset();
        this.snackbar.show({
            message: '导入成功',
            actionText: '好的',
            multiline: false,
            actionOnBottom: false
        });
    }
    choiceImage(event) {
        const ImageContainer = event.target;
        const Reader = new FileReader();
        Reader.onload = e => {
            this.LoadImage(Reader.result.toString());
        };
        Reader.readAsDataURL(ImageContainer.files[0]);
    }
    onPasteImage() {
        document.addEventListener('paste', event => {
            const items = event.clipboardData && event.clipboardData.items;
            if (items && items.length) {
                if (items[0].type.indexOf('image') !== -1) {
                    const file = items[0].getAsFile();
                    const Reader = new FileReader();
                    Reader.onload = e => {
                        this.LoadImage(Reader.result.toString());
                    };
                    Reader.readAsDataURL(file);
                }
            }
        });
    }
    LoadImage(src: string) {
        this.ImageElement.onload = e => {
            this.ImageLoaded = true;
            this.Canvas.width = this.ImageElement.width;
            this.Canvas.height = this.ImageElement.height;
            this.reset();
            this.objectRegonition()
        };
        this.ImageElement.src = src;
    }
    mergeHash(...arg) {
        let ArrSame = [...arg]
        let count = 0;
        ArrSame = ArrSame.map(value => {
            if (typeof value == "string") {
                count++;
                return value.split("").map(value => Number(value))
            } else {
                count += value.count;
                return value.hash;
            }
        });
        return {
            hash: (function () {
                return new Array(ArrSame[0].length).fill(0).map((val, i) => {
                    for (let sval of ArrSame) {
                        val += sval[i];
                    }
                    return val;
                }).map(v => v)
            })(), count: count, id: null
        }
    }
    registerWorker() {
        this.worker = new Worker('../auto-detect-hash/detect.worker', { type: 'module' });
        this.worker.onmessage = this.MessageDeal.bind(this);
        this.ItemHashList = JSON.parse(localStorage.getItem("detect-setting")) || (Boolean(localStorage.setItem("detect-setting", JSON.stringify(this.ItemHashList))) || this.ItemHashList);
        this.reset();
    }
    reset() {
        this.XBound = [];
        this.YBound = [];
        this.ItemImages = [];
        this.ItemImage = "";
        this.NumberImages = [];
        this.FontSize = 0;
        this.ModifyingItem = null;
        this.ModifyBuffer = {};
        this.Modifying = { x: 0, y: 0 };
        this.detectedItem = [];
        this.Lock = false;
        this.RecordItemHash = {};
        this.OriginHash = [];
        this.Ctx.drawImage(this.ImageElement, 0, 0);
        this.worker.postMessage({ method: "LoadHashData", Data: this.ItemHashList });
        for (let item of this.ItemHashList) {
            this.RecordItemHash[item.id] = {
                hash: item.hash.map(v => v / item.count).map(v => (v == 0.5 ? 2 : ((v < 0.5) ? 0 : 1))),
                count: item.count
            }
        }
        for (let id of Object.keys(this.ItemNames)) {
            if (!(id in this.RecordItemHash)) {
                this.RecordItemHash[id] = {
                    id: id,
                    hash: new Array(144).fill(0),
                    count: 0
                }
            }
        }
    }
    objectRegonition() {
        this.worker.postMessage({ method: 'ImageDataLoad', data: this.Ctx.getImageData(0, 0, this.Canvas.width, this.Canvas.height) });
    }
    MessageDeal(message: MessageEvent) {
        switch (message.data.method) {
            case 'status':
                this.InfoText = message.data.text;
                this.progress = message.data.progress;
                break;
            case 'clipImage':
                this.XBound = message.data.XBound;
                this.YBound = message.data.YBound;
                const ImageDatas = [];
                for (let y = 0; y < this.YBound.length; y++) {
                    for (let x = 0; x < this.XBound.length; x++) {
                        const Canvas = document.createElement('canvas');
                        Canvas.width = this.XBound[x][1] - this.XBound[x][0];
                        Canvas.height = this.YBound[y][1] - this.YBound[y][0];
                        const ctx = Canvas.getContext('2d');
                        ctx.drawImage(this.ImageElement, this.XBound[x][0], this.YBound[y][0], Canvas.width, Canvas.height, 0, 0, Canvas.width, Canvas.height);
                        this.ItemImages.push(Canvas);
                        const DhashCanvas = document.createElement('canvas');
                        DhashCanvas.width = 13;
                        DhashCanvas.height = 12;
                        const DhashCtx = DhashCanvas.getContext('2d');
                        DhashCtx.drawImage(Canvas, 0, 0, Canvas.width, Canvas.height, 0, 0, DhashCanvas.width, DhashCanvas.height);
                        ImageDatas.push(DhashCtx.getImageData(0, 0, DhashCanvas.width, DhashCanvas.height));
                        this.Ctx.strokeRect(this.XBound[x][0], this.YBound[y][0], Canvas.width, Canvas.height);
                    }
                }
                this.worker.postMessage({ method: 'calcDhash', ImageDatas });
                break;
            case "SingleItemHash":
                this.detectedItem = message.data.Item;
                for (let id of Object.keys(this.ItemNames)) {
                    if (!this.detectedItem.some(a => {
                        return a.id == id
                    })) {
                        this.detectedItem.push({
                            id: id,
                            hash: new Array(144).fill(0),
                            count: 0
                        })
                    }
                }
                this.OriginHash = message.data.OriginHash.split('').map(a => Number(a));
                this.ModifyingItem = {
                    id: this.detectedItem[0].id,
                    name: this.ItemNames[this.detectedItem[0].id],
                    item: this.detectedItem
                };
                for (const key of Object.keys(this.ModifyingItem)) {
                    if (typeof this.ModifyingItem[key] !== 'object') {
                        this.ModifyBuffer[key] = this.ModifyingItem[key];
                    }
                }
                break;
        }
    }
    Merge() {
        let HashList = this.ItemHashList.findIndex(a => a.id == this.ModifyBuffer.id);
        let NewHashList = this.mergeHash(this.ItemHashList[HashList], this.OriginHash.join(''))
        NewHashList.id = this.ItemHashList[HashList].id;
        this.ItemHashList[HashList] = NewHashList;
        localStorage.setItem("detect-setting", JSON.stringify(this.ItemHashList));
        this.reset();
        this.objectRegonition();
    }
    Replace() {
        let HashList = this.ItemHashList.find(a => a.id == this.ModifyBuffer.id);
        HashList.count = 1;
        HashList.hash = this.OriginHash;
        localStorage.setItem("detect-setting", JSON.stringify(this.ItemHashList));
        this.reset();
        this.objectRegonition();
    }
    ChoiceItem(e: MouseEvent, dialog: MdcDialogDirective) {
        const rect = this.Canvas.getBoundingClientRect();
        const clickY = e.offsetY * (this.Canvas.height / rect.height);
        const clickX = e.offsetX * (this.Canvas.width / rect.width);
        let x: number;
        let y: number;
        for (let ya = 0, YAll = this.YBound.length; ya < YAll; ya++) {
            if (this.YBound[ya].length !== 2) { continue; }
            if (clickY >= this.YBound[ya][0] && clickY <= this.YBound[ya][1]) {
                y = ya;
                break;
            }
        }
        for (let xa = 0, XAll = this.XBound.length; xa < XAll; xa++) {
            if (this.XBound[xa].length !== 2) { continue; }
            if (clickX >= this.XBound[xa][0] && clickX <= this.XBound[xa][1]) {
                x = xa;
                break;
            }
        }
        if (typeof x === 'undefined' || typeof y === 'undefined') { return; }
        this.ItemImage = this.ItemImages[this.XBound.length * y + x].toDataURL();
        this.worker.postMessage({ method: 'getItemHashs', index: this.XBound.length * y + x });
        dialog.open();
    }
    Data() {
        return localStorage.getItem('detect-setting');
    }
}