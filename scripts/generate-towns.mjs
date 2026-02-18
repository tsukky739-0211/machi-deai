// 街データ生成スクリプト — Node.jsで実行してtowns.jsonに書き出す
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const categories = ["グルメ","カフェ","ショッピング","公園・自然","文化・アート","夜の街","子育て","生活便利","イベント","ランドマーク"];

// 街の基本データを定義
const townDefs = [
  {
    slug:"shimokitazawa",name:"下北沢",area:"世田谷区",
    station:["下北沢駅"],lines:["小田急線","京王井の頭線"],
    catchcopy:"カルチャーが息づく、自由の街",
    description:"古着屋、小劇場、ライブハウス、カレー屋が密集する下北沢。再開発で生まれた下北線路街やBONUS TRACKが加わり、新旧のカルチャーが混ざり合う唯一無二の空気感。渋谷まで急行で1駅という抜群のアクセスも魅力。",
    vibe:["カルチャー","古着","サブカル","カフェ","ライブ"],popularity:5,
    avgRent:{oneRoom:"7.5万",oneK:"9.2万",oneLDK:"14.5万"},
    bestFor:["20代一人暮らし","クリエイター"],
    commuteMinutes:{"渋谷":5,"新宿":12,"東京":25,"池袋":22,"品川":25},
    spots:[
      {rank:10,name:"下北線路街",category:"ショッピング",description:"小田急線路跡地に生まれた全長1.7kmの新スポット",icon:"🛤️"},
      {rank:9,name:"BONUS TRACK",category:"カフェ",description:"個性派ショップが集まる商業施設",icon:"🎵"},
      {rank:8,name:"ヴィレッジヴァンガード下北沢店",category:"ショッピング",description:"サブカルの聖地的書店",icon:"📚"},
      {rank:7,name:"一番街商店街",category:"ショッピング",description:"古着屋が連なるメインストリート",icon:"👕"},
      {rank:6,name:"本多劇場",category:"文化・アート",description:"演劇の聖地として全国の劇団が目指す場所",icon:"🎭"},
      {rank:5,name:"ミカン下北",category:"グルメ",description:"飲食とカルチャーの複合施設",icon:"🍊"},
      {rank:4,name:"下北沢カレーフェスティバル",category:"イベント",description:"年に一度の街全体がカレー一色になるイベント",icon:"🍛"},
      {rank:3,name:"古着屋巡り",category:"ショッピング",description:"200店以上の古着屋が密集する日本有数のエリア",icon:"👗"},
      {rank:2,name:"ライブハウス群",category:"文化・アート",description:"SHELTER、GARDEN等、伝説のライブハウスが集結",icon:"🎸"},
      {rank:1,name:"下北沢の空気感",category:"ランドマーク",description:"自由で寛容な雰囲気こそが最大の魅力",icon:"✨"},
    ]
  },
  {
    slug:"kichijoji",name:"吉祥寺",area:"武蔵野市",
    station:["吉祥寺駅"],lines:["JR中央線","京王井の頭線"],
    catchcopy:"住みたい街No.1の実力",
    description:"井の頭公園の豊かな緑、ハモニカ横丁の昭和レトロ、パルコやコピスの都市機能。都心近郊でありながら自然と文化が高次元で共存する稀有な街。",
    vibe:["おしゃれ","自然","カフェ","ショッピング","公園"],popularity:5,
    avgRent:{oneRoom:"7.8万",oneK:"9.5万",oneLDK:"15.0万"},
    bestFor:["カップル","ファミリー","20代一人暮らし"],
    commuteMinutes:{"渋谷":17,"新宿":15,"東京":30,"池袋":27,"品川":35},
    spots:[
      {rank:10,name:"コピス吉祥寺",category:"ショッピング",description:"ファミリーにも嬉しい大型商業施設",icon:"🏬"},
      {rank:9,name:"A&F COUNTRY",category:"ショッピング",description:"アウトドア好きにはたまらない品揃え",icon:"⛺"},
      {rank:8,name:"いせや総本店",category:"グルメ",description:"名物の焼き鳥は1本80円からの老舗",icon:"🍢"},
      {rank:7,name:"吉祥寺プティット村",category:"カフェ",description:"猫カフェもある隠れ家的メルヘン空間",icon:"🐱"},
      {rank:6,name:"月窓寺",category:"ランドマーク",description:"繁華街の真ん中にある静寂のお寺",icon:"🏯"},
      {rank:5,name:"サンロード商店街",category:"ショッピング",description:"駅から続くアーケード商店街は雨でも快適",icon:"🌂"},
      {rank:4,name:"吉祥寺パルコ",category:"ショッピング",description:"トレンドショップが揃うファッションビル",icon:"👠"},
      {rank:3,name:"東急百貨店の屋上",category:"公園・自然",description:"意外と知られていない穴場ビュースポット",icon:"🌆"},
      {rank:2,name:"ハモニカ横丁",category:"グルメ",description:"戦後の闇市から続く昭和レトロな飲み屋街",icon:"🏮"},
      {rank:1,name:"井の頭恩賜公園",category:"公園・自然",description:"四季折々の美しさ。ボート池は定番デートスポット",icon:"🌳"},
    ]
  },
  {
    slug:"nakameguro",name:"中目黒",area:"目黒区",
    station:["中目黒駅"],lines:["東急東横線","東京メトロ日比谷線"],
    catchcopy:"大人の洗練と、川沿いの穏やかさ",
    description:"目黒川沿いの桜並木で有名だが、普段は落ち着いた大人の街。洗練されたカフェやセレクトショップが点在し、渋谷・恵比寿至近ながら喧騒とは無縁の心地よさ。",
    vibe:["おしゃれ","カフェ","大人","桜","洗練"],popularity:5,
    avgRent:{oneRoom:"9.0万",oneK:"11.0万",oneLDK:"17.5万"},
    bestFor:["20代〜30代","DINKS","おしゃれ好き"],
    commuteMinutes:{"渋谷":4,"新宿":18,"東京":20,"池袋":25,"品川":18},
    spots:[
      {rank:10,name:"TRAVELER'S FACTORY",category:"ショッピング",description:"旅好き御用達のトラベラーズノート直営店",icon:"✈️"},
      {rank:9,name:"中目黒高架下",category:"グルメ",description:"高架下をリノベした飲食店街",icon:"🍷"},
      {rank:8,name:"PEANUTS Cafe",category:"カフェ",description:"スヌーピーの世界観に浸れるカフェ",icon:"🥜"},
      {rank:7,name:"目黒川の夜桜",category:"イベント",description:"ライトアップされた桜は東京屈指の絶景",icon:"🌸"},
      {rank:6,name:"代官山への散歩道",category:"ランドマーク",description:"中目黒から代官山へ歩く20分の贅沢な散策",icon:"🚶"},
      {rank:5,name:"Onibus Coffee",category:"カフェ",description:"東京を代表するスペシャルティコーヒー",icon:"☕"},
      {rank:4,name:"NADiff apart",category:"文化・アート",description:"アートブック専門店で感性を磨く",icon:"📖"},
      {rank:3,name:"蔦屋書店中目黒店",category:"カフェ",description:"スタバ併設のおしゃれ書店は街の象徴",icon:"📚"},
      {rank:2,name:"目黒川沿いのカフェ巡り",category:"カフェ",description:"川沿いに並ぶ個性派カフェは一日では回りきれない",icon:"🏪"},
      {rank:1,name:"目黒川の桜",category:"公園・自然",description:"約800本の桜が咲き誇る東京最高の花見スポット",icon:"🌸"},
    ]
  },
  {
    slug:"yanaka",name:"谷中",area:"台東区",
    station:["日暮里駅","千駄木駅"],lines:["JR山手線","東京メトロ千代田線"],
    catchcopy:"猫と坂と、昭和の記憶",
    description:"谷中銀座を中心に昔ながらの商店街が残り、猫があちこちで昼寝する。寺町としての歴史も深く、下町情緒と穏やかな時間の流れがここにはある。",
    vibe:["下町","レトロ","猫","散歩","寺社"],popularity:3,
    avgRent:{oneRoom:"7.0万",oneK:"8.5万",oneLDK:"13.0万"},
    bestFor:["のんびり派","猫好き","写真好き"],
    commuteMinutes:{"渋谷":25,"新宿":20,"東京":12,"池袋":15,"品川":22},
    spots:[
      {rank:10,name:"朝倉彫塑館",category:"文化・アート",description:"彫刻家の自宅兼アトリエがそのまま美術館に",icon:"🗿"},
      {rank:9,name:"谷中の猫たち",category:"ランドマーク",description:"路地裏のいたるところで猫に出会える",icon:"🐱"},
      {rank:8,name:"SCAI THE BATHHOUSE",category:"文化・アート",description:"銭湯をリノベしたギャラリー",icon:"🎨"},
      {rank:7,name:"経王寺",category:"ランドマーク",description:"上野戦争の弾痕が残る歴史的な寺",icon:"🏯"},
      {rank:6,name:"ひみつ堂",category:"グルメ",description:"天然氷のかき氷に行列ができる名店",icon:"🍧"},
      {rank:5,name:"夕やけだんだん",category:"ランドマーク",description:"夕焼けが美しい階段は谷中のシンボル",icon:"🌅"},
      {rank:4,name:"谷中霊園の桜",category:"公園・自然",description:"桜のトンネルは知る人ぞ知る花見スポット",icon:"🌸"},
      {rank:3,name:"yanaka coffee",category:"カフェ",description:"自家焙煎の香りが商店街に漂う",icon:"☕"},
      {rank:2,name:"谷中銀座商店街",category:"ショッピング",description:"60以上の店が並ぶ活気ある下町商店街",icon:"🏮"},
      {rank:1,name:"谷中の空気感",category:"ランドマーク",description:"東京にこんな場所があったのかと思わせる穏やかさ",icon:"🕊️"},
    ]
  },
  {
    slug:"koenji",name:"高円寺",area:"杉並区",
    station:["高円寺駅"],lines:["JR中央線"],
    catchcopy:"阿波踊りとパンクロックの街",
    description:"古着、ライブハウス、カレー、居酒屋。独自のカウンターカルチャーが根付く高円寺は、家賃も比較的安く若者に人気。毎年8月の阿波踊りは100万人が訪れる一大イベント。",
    vibe:["カルチャー","古着","ライブ","カレー","下町"],popularity:4,
    avgRent:{oneRoom:"6.8万",oneK:"8.0万",oneLDK:"12.5万"},
    bestFor:["20代一人暮らし","ミュージシャン","自由人"],
    commuteMinutes:{"渋谷":20,"新宿":8,"東京":25,"池袋":18,"品川":30},
    spots:[
      {rank:10,name:"座・高円寺",category:"文化・アート",description:"伊東豊雄設計のテント型劇場",icon:"🎪"},
      {rank:9,name:"気象神社",category:"ランドマーク",description:"日本唯一の天気の神様を祀る神社",icon:"⛩️"},
      {rank:8,name:"パル商店街",category:"ショッピング",description:"全長700mのアーケードは雨の日も安心",icon:"🌂"},
      {rank:7,name:"小杉湯",category:"生活便利",description:"昭和8年創業の銭湯は地域コミュニティの要",icon:"♨️"},
      {rank:6,name:"スターロード",category:"夜の街",description:"個性的な飲み屋が並ぶディープな通り",icon:"🌟"},
      {rank:5,name:"古着屋ストリート",category:"ショッピング",description:"下北沢と双璧をなす古着の聖地",icon:"👕"},
      {rank:4,name:"カレー激戦区",category:"グルメ",description:"50店以上のカレー屋がひしめく",icon:"🍛"},
      {rank:3,name:"ライブハウス群",category:"文化・アート",description:"無名バンドが明日のスターになる場所",icon:"🎸"},
      {rank:2,name:"純情商店街",category:"ショッピング",description:"ねじめ正一の小説でも有名な人情味溢れる商店街",icon:"🏮"},
      {rank:1,name:"高円寺阿波おどり",category:"イベント",description:"毎年100万人が熱狂する東京の夏の風物詩",icon:"💃"},
    ]
  },
  {
    slug:"nishi-ogikubo",name:"西荻窪",area:"杉並区",
    station:["西荻窪駅"],lines:["JR中央線"],
    catchcopy:"アンティークと喫茶の隠れ里",
    description:"吉祥寺の隣でありながら観光客は少なく、アンティークショップと個人経営の喫茶店が点在する静かな街。中央線カルチャーの良質な部分を凝縮した穴場。",
    vibe:["アンティーク","喫茶","穴場","散歩","静か"],popularity:2,
    avgRent:{oneRoom:"6.5万",oneK:"7.8万",oneLDK:"12.0万"},
    bestFor:["30代一人暮らし","本好き","静かに暮らしたい人"],
    commuteMinutes:{"渋谷":20,"新宿":13,"東京":30,"池袋":25,"品川":35},
    spots:[
      {rank:10,name:"どんぐり舎",category:"カフェ",description:"自家焙煎の珈琲と静かな時間",icon:"☕"},
      {rank:9,name:"にしおぎBASE",category:"文化・アート",description:"地域密着の小さなイベントスペース",icon:"🏠"},
      {rank:8,name:"善福寺公園",category:"公園・自然",description:"武蔵野の面影が残る静かな公園",icon:"🌿"},
      {rank:7,name:"西荻窪のアンティーク通り",category:"ショッピング",description:"20以上のアンティーク店が集まる",icon:"🕰️"},
      {rank:6,name:"松庵文庫",category:"カフェ",description:"古民家を改装した隠れ家カフェ",icon:"📖"},
      {rank:5,name:"戎",category:"グルメ",description:"西荻住民が愛するとんかつの名店",icon:"🍖"},
      {rank:4,name:"それいゆ",category:"カフェ",description:"昭和を感じる純喫茶の名店",icon:"☕"},
      {rank:3,name:"西荻窪の路地裏",category:"ランドマーク",description:"歩くたびに新しい発見がある迷路のような路地",icon:"🗺️"},
      {rank:2,name:"仲通街の飲み屋",category:"夜の街",description:"常連になりたくなる小さな名店が並ぶ",icon:"🍺"},
      {rank:1,name:"西荻窪の「ちょうどいい感」",category:"ランドマーク",description:"便利すぎず不便すぎない、暮らしに最適な距離感",icon:"🏡"},
    ]
  },
  {
    slug:"sangenjaya",name:"三軒茶屋",area:"世田谷区",
    station:["三軒茶屋駅"],lines:["東急田園都市線","東急世田谷線"],
    catchcopy:"路地裏に潜む、大人の遊び場",
    description:"渋谷から急行で1駅。キャロットタワーの足元には昭和の飲み屋街が広がり、路地裏にはワインバーやビストロが隠れる。世田谷線でのんびり散歩もおすすめ。",
    vibe:["グルメ","飲み屋","大人","路地裏","世田谷"],popularity:4,
    avgRent:{oneRoom:"7.8万",oneK:"9.5万",oneLDK:"14.8万"},
    bestFor:["20代後半〜30代","グルメ好き","飲み歩き派"],
    commuteMinutes:{"渋谷":5,"新宿":20,"東京":25,"池袋":28,"品川":22},
    spots:[
      {rank:10,name:"世田谷線沿いの散歩",category:"ランドマーク",description:"レトロな2両編成でぶらり途中下車の旅",icon:"🚋"},
      {rank:9,name:"シアタートラム",category:"文化・アート",description:"良質な演劇が観られるキャロットタワー内の劇場",icon:"🎭"},
      {rank:8,name:"キャロットタワー展望台",category:"ランドマーク",description:"無料で楽しめる26階の絶景パノラマ",icon:"🏙️"},
      {rank:7,name:"ラーメン激戦区",category:"グルメ",description:"環七沿いを中心にラーメン店がひしめく",icon:"🍜"},
      {rank:6,name:"栄通り商店街",category:"ショッピング",description:"地元密着の商店街で日常の買い物も充実",icon:"🛒"},
      {rank:5,name:"すずらん通り",category:"夜の街",description:"昭和レトロな飲み屋街で梯子酒",icon:"🏮"},
      {rank:4,name:"エコー仲見世商店街",category:"ショッピング",description:"三角地帯と呼ばれるディープな飲み屋街",icon:"🍶"},
      {rank:3,name:"路地裏ビストロ群",category:"グルメ",description:"予約困難な小さなビストロが路地裏に点在",icon:"🍷"},
      {rank:2,name:"三茶の飲み文化",category:"夜の街",description:"1000円台のはしご酒が当たり前の庶民派グルメタウン",icon:"🍺"},
      {rank:1,name:"三軒茶屋の人情",category:"ランドマーク",description:"おせっかいなくらい温かい店主たちが街を作る",icon:"❤️"},
    ]
  },
  {
    slug:"kagurazaka",name:"神楽坂",area:"新宿区",
    station:["神楽坂駅","飯田橋駅"],lines:["東京メトロ東西線","JR総武線","東京メトロ有楽町線"],
    catchcopy:"和とフレンチが交差する坂の街",
    description:"石畳の路地に料亭と高級フレンチが共存する独特の街並み。毘沙門天善國寺を中心に、花街の名残と現代のグルメが融合した大人の街。",
    vibe:["グルメ","和風","フレンチ","大人","坂道"],popularity:3,
    avgRent:{oneRoom:"9.0万",oneK:"10.5万",oneLDK:"16.0万"},
    bestFor:["30代〜40代","グルメ好き","大人カップル"],
    commuteMinutes:{"渋谷":20,"新宿":10,"東京":15,"池袋":12,"品川":25},
    spots:[
      {rank:10,name:"赤城神社",category:"ランドマーク",description:"隈研吾設計のモダンな神社建築",icon:"⛩️"},
      {rank:9,name:"la kagu",category:"カフェ",description:"新潮社の倉庫をリノベした複合施設",icon:"🏛️"},
      {rank:8,name:"毘沙門天善國寺",category:"ランドマーク",description:"神楽坂のシンボル的なお寺",icon:"🏯"},
      {rank:7,name:"ギンレイホール",category:"文化・アート",description:"名画座として愛された映画館（惜しまれつつ閉館）",icon:"🎬"},
      {rank:6,name:"兵庫横丁",category:"ランドマーク",description:"迷路のような路地は花街の名残",icon:"🏮"},
      {rank:5,name:"神楽坂フレンチ",category:"グルメ",description:"本場顔負けのフレンチレストランが20軒以上",icon:"🇫🇷"},
      {rank:4,name:"かもめブックス",category:"ショッピング",description:"校正会社が営む本好きのための書店",icon:"📚"},
      {rank:3,name:"神楽坂まつり",category:"イベント",description:"阿波踊りとほおずき市で夏を感じる",icon:"🎆"},
      {rank:2,name:"石畳の路地",category:"ランドマーク",description:"黒塀と石畳が作り出す京都のような風情",icon:"🪨"},
      {rank:1,name:"和仏折衷の粋",category:"ランドマーク",description:"日本とフランスの食文化が自然に溶け合う奇跡の坂",icon:"✨"},
    ]
  },
  {
    slug:"kiyosumi-shirakawa",name:"清澄白河",area:"江東区",
    station:["清澄白河駅"],lines:["東京メトロ半蔵門線","都営大江戸線"],
    catchcopy:"コーヒーとアートの水辺の街",
    description:"ブルーボトルコーヒー日本1号店の出店で一躍注目された街。東京都現代美術館を核に、倉庫をリノベしたギャラリーやロースタリーが点在。運河沿いの散歩が気持ちいい。",
    vibe:["コーヒー","アート","リノベ","水辺","穴場"],popularity:3,
    avgRent:{oneRoom:"8.0万",oneK:"9.5万",oneLDK:"14.0万"},
    bestFor:["クリエイター","コーヒー好き","アート好き"],
    commuteMinutes:{"渋谷":25,"新宿":28,"東京":12,"池袋":30,"品川":22},
    spots:[
      {rank:10,name:"深川江戸資料館",category:"文化・アート",description:"江戸の街並みを実物大で再現した体験型ミュージアム",icon:"🏯"},
      {rank:9,name:"清澄庭園",category:"公園・自然",description:"都会のオアシス、回遊式林泉庭園",icon:"🌿"},
      {rank:8,name:"fukadaso",category:"カフェ",description:"アパートをリノベしたカフェ＆ギャラリー",icon:"🏠"},
      {rank:7,name:"ALLPRESS ESPRESSO",category:"カフェ",description:"NZ発のロースタリーカフェ",icon:"☕"},
      {rank:6,name:"深川めし",category:"グルメ",description:"あさりの炊き込みご飯は下町の味",icon:"🍚"},
      {rank:5,name:"リノベ倉庫群",category:"文化・アート",description:"倉庫街がギャラリーに変身した清澄白河らしい風景",icon:"🏭"},
      {rank:4,name:"隅田川テラス",category:"公園・自然",description:"水辺のランニング＆散歩コース",icon:"🏃"},
      {rank:3,name:"The Cream of the Crop Coffee",category:"カフェ",description:"焙煎所併設の本格ロースタリー",icon:"☕"},
      {rank:2,name:"東京都現代美術館",category:"文化・アート",description:"日本最大級の現代美術館は建築も見もの",icon:"🎨"},
      {rank:1,name:"ブルーボトルコーヒー",category:"カフェ",description:"清澄白河をコーヒーの街にした立役者",icon:"💙"},
    ]
  },
  {
    slug:"togoshi-ginza",name:"戸越銀座",area:"品川区",
    station:["戸越銀座駅"],lines:["東急池上線"],
    catchcopy:"東京一長い商店街で食べ歩き",
    description:"全長約1.3kmの戸越銀座商店街には400以上の店舗が並ぶ。コロッケ、焼き鳥、たこ焼きなど食べ歩きグルメの宝庫。下町の温かさと品川区の利便性を兼ね備えた穴場。",
    vibe:["商店街","食べ歩き","下町","穴場","コスパ"],popularity:2,
    avgRent:{oneRoom:"7.2万",oneK:"8.5万",oneLDK:"13.0万"},
    bestFor:["一人暮らし","食べ歩き好き","コスパ重視"],
    commuteMinutes:{"渋谷":15,"新宿":22,"東京":22,"池袋":28,"品川":10},
    spots:[
      {rank:10,name:"戸越公園",category:"公園・自然",description:"旧大名庭園の面影を残す緑豊かな公園",icon:"🌳"},
      {rank:9,name:"後藤蒲鉾店",category:"グルメ",description:"揚げたておでん種は絶品",icon:"🍢"},
      {rank:8,name:"中華そば多賀野",category:"グルメ",description:"ミシュランガイドにも掲載されたラーメン",icon:"🍜"},
      {rank:7,name:"安田屋のメンチカツ",category:"グルメ",description:"行列必至の揚げたてメンチカツ",icon:"🥩"},
      {rank:6,name:"東急池上線の旅",category:"ランドマーク",description:"レトロな3両編成でのんびりローカル線の旅",icon:"🚃"},
      {rank:5,name:"銀六商店街",category:"ショッピング",description:"戸越銀座の延長にある地元密着商店街",icon:"🛒"},
      {rank:4,name:"おかずの田野倉",category:"グルメ",description:"手作り惣菜が美味しい地元の台所",icon:"🍱"},
      {rank:3,name:"焼き鳥の大沢商店",category:"グルメ",description:"1本50円からの焼き鳥は散歩のお供に",icon:"🍗"},
      {rank:2,name:"龍輝のコロッケ",category:"グルメ",description:"戸越銀座名物、揚げたてサクサクのコロッケ",icon:"🥔"},
      {rank:1,name:"戸越銀座商店街",category:"ショッピング",description:"全長1.3km、400店舗が並ぶ東京一長い商店街",icon:"🏮"},
    ]
  },
  {
    slug:"ikejiri-ohashi",name:"池尻大橋",area:"世田谷区",
    station:["池尻大橋駅"],lines:["東急田園都市線"],
    catchcopy:"目黒川の始まり、静かな世田谷暮らし",
    description:"渋谷まで1駅3分でありながら静かな住宅街。目黒川の上流域にあたり、春は桜が美しい。三軒茶屋・中目黒にも近く、穴場的な住みやすさが魅力。",
    vibe:["穴場","静か","桜","世田谷","アクセス"],popularity:2,
    avgRent:{oneRoom:"8.0万",oneK:"9.8万",oneLDK:"15.5万"},
    bestFor:["社会人一人暮らし","穴場好き","渋谷勤務"],
    commuteMinutes:{"渋谷":3,"新宿":15,"東京":22,"池袋":23,"品川":18},
    spots:[
      {rank:10,name:"世田谷公園",category:"公園・自然",description:"ミニSLが走る世田谷区民の憩いの場",icon:"🚂"},
      {rank:9,name:"Boulangerie Sudo",category:"グルメ",description:"行列必至の人気パン屋",icon:"🍞"},
      {rank:8,name:"目黒天空庭園",category:"公園・自然",description:"首都高ジャンクション上に作られた空中庭園",icon:"🌿"},
      {rank:7,name:"IID 世田谷ものづくり学校",category:"文化・アート",description:"廃校を活用したクリエイティブ施設",icon:"🏫"},
      {rank:6,name:"池尻のパン屋巡り",category:"グルメ",description:"なぜかパン屋の名店が多いエリア",icon:"🥖"},
      {rank:5,name:"渋谷まで1駅3分",category:"生活便利",description:"この近さでこの静けさは東京の奇跡",icon:"🚃"},
      {rank:4,name:"目黒川上流の桜",category:"公園・自然",description:"中目黒より人が少なくゆっくり花見できる",icon:"🌸"},
      {rank:3,name:"大橋会館周辺の飲食店",category:"グルメ",description:"隠れた名店が点在するグルメエリア",icon:"🍽️"},
      {rank:2,name:"静かな住宅街",category:"ランドマーク",description:"渋谷至近なのに閑静な住宅街という贅沢",icon:"🏡"},
      {rank:1,name:"アクセスと静けさの両立",category:"ランドマーク",description:"渋谷3分なのに穴場。知る人ぞ知る最強立地",icon:"✨"},
    ]
  },
  {
    slug:"asakusa",name:"浅草",area:"台東区",
    station:["浅草駅"],lines:["東京メトロ銀座線","都営浅草線","東武スカイツリーライン"],
    catchcopy:"江戸の粋が今も息づく門前町",
    description:"雷門・仲見世の観光地イメージが強いが、一歩裏通りに入れば地元民が通う老舗が点在。隅田川の花火、三社祭など四季折々のイベントも豊富。",
    vibe:["下町","観光","祭り","和風","歴史"],popularity:5,
    avgRent:{oneRoom:"8.5万",oneK:"9.8万",oneLDK:"14.5万"},
    bestFor:["下町好き","祭り好き","外国人の友人が多い人"],
    commuteMinutes:{"渋谷":30,"新宿":28,"東京":15,"池袋":25,"品川":25},
    spots:[
      {rank:10,name:"花やしき",category:"ランドマーク",description:"日本最古の遊園地は昭和レトロの極み",icon:"🎡"},
      {rank:9,name:"隅田公園",category:"公園・自然",description:"スカイツリーを望む水辺のオアシス",icon:"🌳"},
      {rank:8,name:"ホッピー通り",category:"夜の街",description:"昼飲みの聖地でもつ煮込みとホッピーを",icon:"🍺"},
      {rank:7,name:"隅田川花火大会",category:"イベント",description:"約20,000発の花火が下町の夜空を彩る",icon:"🎆"},
      {rank:6,name:"浅草寺のおみくじ",category:"ランドマーク",description:"凶が多いことで有名なスリリングなおみくじ",icon:"🎋"},
      {rank:5,name:"天ぷら大黒家",category:"グルメ",description:"ごま油で揚げる江戸前天ぷらの名店",icon:"🍤"},
      {rank:4,name:"三社祭",category:"イベント",description:"江戸三大祭の一つ、街全体が熱狂する3日間",icon:"🏮"},
      {rank:3,name:"浅草の喫茶店巡り",category:"カフェ",description:"アンヂェラス、ローヤル珈琲店など名喫茶が健在",icon:"☕"},
      {rank:2,name:"仲見世通り",category:"ショッピング",description:"日本最古の商店街は見るだけでも楽しい",icon:"🏪"},
      {rank:1,name:"雷門と浅草寺",category:"ランドマーク",description:"日本を代表する観光名所は浅草の誇り",icon:"⛩️"},
    ]
  },
  {
    slug:"ebisu",name:"恵比寿",area:"渋谷区",
    station:["恵比寿駅"],lines:["JR山手線","東京メトロ日比谷線"],
    catchcopy:"大人が選ぶ、上質な日常",
    description:"恵比寿ガーデンプレイスを中心にした洗練された街並み。高級レストランから庶民的な横丁まで食の幅が広く、代官山・中目黒にも徒歩圏内。",
    vibe:["おしゃれ","グルメ","大人","洗練","デート"],popularity:5,
    avgRent:{oneRoom:"9.5万",oneK:"11.5万",oneLDK:"18.0万"},
    bestFor:["30代社会人","DINKS","グルメ好き"],
    commuteMinutes:{"渋谷":2,"新宿":12,"東京":18,"池袋":20,"品川":12},
    spots:[
      {rank:10,name:"恵比寿横丁",category:"夜の街",description:"レトロな飲み屋横丁で肩肘張らない一杯",icon:"🍶"},
      {rank:9,name:"YEBISU BREWERY TOKYO",category:"グルメ",description:"ヱビスビールの歴史を学び、出来立てを飲む",icon:"🍺"},
      {rank:8,name:"写真美術館",category:"文化・アート",description:"写真とメディアアートの専門美術館",icon:"📷"},
      {rank:7,name:"代官山への散歩",category:"ランドマーク",description:"恵比寿から代官山まで歩く15分の贅沢",icon:"🚶"},
      {rank:6,name:"アトレ恵比寿",category:"ショッピング",description:"駅直結の充実した商業施設",icon:"🏬"},
      {rank:5,name:"恵比寿の隠れ家レストラン",category:"グルメ",description:"予約困難な名店が路地裏に点在",icon:"🍽️"},
      {rank:4,name:"LIQUIDROOM",category:"文化・アート",description:"伝説的なライブハウスで音楽を浴びる",icon:"🎵"},
      {rank:3,name:"恵比寿ガーデンプレイスのイルミネーション",category:"イベント",description:"冬の風物詩、バカラシャンデリアが輝く",icon:"✨"},
      {rank:2,name:"恵比寿の食文化",category:"グルメ",description:"ミシュラン星付きから立ち飲みまで食の万華鏡",icon:"🌟"},
      {rank:1,name:"恵比寿ガーデンプレイス",category:"ランドマーク",description:"四季折々の美しさを見せる恵比寿のシンボル",icon:"🏛️"},
    ]
  },
  {
    slug:"musashi-koyama",name:"武蔵小山",area:"品川区",
    station:["武蔵小山駅"],lines:["東急目黒線"],
    catchcopy:"アーケード商店街とタワマンの新旧共存",
    description:"東京最大級のアーケード商店街パルムを持つ武蔵小山。再開発でタワーマンションが建ち並ぶ一方、昔ながらの飲み屋街も健在。目黒・品川に近く交通も便利。",
    vibe:["商店街","穴場","再開発","コスパ","下町"],popularity:2,
    avgRent:{oneRoom:"7.5万",oneK:"9.0万",oneLDK:"14.0万"},
    bestFor:["一人暮らし","ファミリー","コスパ重視"],
    commuteMinutes:{"渋谷":12,"新宿":20,"東京":20,"池袋":25,"品川":8},
    spots:[
      {rank:10,name:"温泉「清水湯」",category:"生活便利",description:"天然温泉の銭湯は疲れた体を癒す",icon:"♨️"},
      {rank:9,name:"The Park Tower",category:"ランドマーク",description:"再開発のシンボル的タワーマンション",icon:"🏢"},
      {rank:8,name:"武蔵小山の焼き鳥屋",category:"グルメ",description:"1本100円台の名店がひしめく",icon:"🍢"},
      {rank:7,name:"りゅえる",category:"グルメ",description:"地元で愛されるイタリアンの名店",icon:"🍝"},
      {rank:6,name:"目黒不動尊",category:"ランドマーク",description:"江戸五色不動の一つ、パワースポット",icon:"⛩️"},
      {rank:5,name:"林試の森公園",category:"公園・自然",description:"林業試験場跡地の巨木が素晴らしい公園",icon:"🌲"},
      {rank:4,name:"パルムの食べ歩き",category:"グルメ",description:"商店街の端から端まで食べ歩きが楽しい",icon:"🍡"},
      {rank:3,name:"飲み屋横丁",category:"夜の街",description:"パルムの裏手に広がるディープな飲み屋街",icon:"🏮"},
      {rank:2,name:"目黒線の便利さ",category:"生活便利",description:"目黒・白金台・品川へ直通の好アクセス",icon:"🚃"},
      {rank:1,name:"パルム商店街",category:"ショッピング",description:"全長800m、屋根付きで雨でも快適な東京屈指の商店街",icon:"🌂"},
    ]
  },
  {
    slug:"shibakoen",name:"芝公園",area:"港区",
    station:["芝公園駅","大門駅"],lines:["都営三田線","都営浅草線","都営大江戸線"],
    catchcopy:"東京タワーの足元で暮らす贅沢",
    description:"東京タワーと増上寺を望む都心の一等地。オフィス街のイメージが強いが、意外と緑が多く落ち着いた住環境。品川・新橋へもすぐで通勤に最強。",
    vibe:["都心","東京タワー","ビジネス","大人","緑"],popularity:2,
    avgRent:{oneRoom:"10.5万",oneK:"12.0万",oneLDK:"19.0万"},
    bestFor:["都心勤務","高収入社会人","利便性最優先"],
    commuteMinutes:{"渋谷":15,"新宿":18,"東京":8,"池袋":22,"品川":8},
    spots:[
      {rank:10,name:"旧芝離宮恩賜庭園",category:"公園・自然",description:"浜松町駅すぐの小さな日本庭園",icon:"🌿"},
      {rank:9,name:"芝大神宮",category:"ランドマーク",description:"「関東のお伊勢さま」と呼ばれる由緒ある神社",icon:"⛩️"},
      {rank:8,name:"東京タワーの夜景",category:"ランドマーク",description:"自宅から毎晩見上げる贅沢",icon:"🗼"},
      {rank:7,name:"大門の居酒屋",category:"夜の街",description:"サラリーマンに混ざって赤ちょうちんの一杯",icon:"🏮"},
      {rank:6,name:"愛宕グリーンヒルズ",category:"ランドマーク",description:"都心にそびえる超高層タワーと庭園",icon:"🏢"},
      {rank:5,name:"増上寺",category:"ランドマーク",description:"東京タワーと増上寺のコラボは最高の眺め",icon:"🏯"},
      {rank:4,name:"慶應仲通り商店街",category:"グルメ",description:"三田の学生街は意外とグルメの穴場",icon:"🍽️"},
      {rank:3,name:"芝公園のランニング",category:"公園・自然",description:"東京タワーを見上げながらの贅沢なランニングコース",icon:"🏃"},
      {rank:2,name:"都心の交通利便性",category:"生活便利",description:"どこに行くにも30分以内の最強アクセス",icon:"🚃"},
      {rank:1,name:"東京タワーのある暮らし",category:"ランドマーク",description:"毎日東京タワーと一緒に暮らせる、それだけで幸せ",icon:"🗼"},
    ]
  },
  {
    slug:"shimotakaido",name:"下高井戸",area:"世田谷区",
    station:["下高井戸駅"],lines:["京王線","東急世田谷線"],
    catchcopy:"商店街と学生が作る温かい街",
    description:"日大文理学部の学生街と地元商店街が共存する穏やかな街。京王線で新宿まで12分、世田谷線で三軒茶屋へも行ける。家賃も手頃で住みやすさ抜群。",
    vibe:["商店街","学生街","穴場","コスパ","世田谷"],popularity:1,
    avgRent:{oneRoom:"6.0万",oneK:"7.2万",oneLDK:"11.5万"},
    bestFor:["学生","20代一人暮らし","コスパ重視"],
    commuteMinutes:{"渋谷":18,"新宿":12,"東京":28,"池袋":22,"品川":28},
    spots:[
      {rank:10,name:"世田谷線の2両編成",category:"ランドマーク",description:"レトロな路面電車で三茶まで小旅行",icon:"🚋"},
      {rank:9,name:"下高井戸シネマ",category:"文化・アート",description:"地域に愛される小さな名画座",icon:"🎬"},
      {rank:8,name:"たつみや",category:"グルメ",description:"学生の味方、ボリューム満点の定食屋",icon:"🍚"},
      {rank:7,name:"赤堤通りの桜並木",category:"公園・自然",description:"知られざる桜のトンネル",icon:"🌸"},
      {rank:6,name:"日大文理キャンパス",category:"ランドマーク",description:"広大なキャンパスは散歩コースにも",icon:"🏫"},
      {rank:5,name:"下高井戸の銭湯",category:"生活便利",description:"昔ながらの銭湯文化が残る",icon:"♨️"},
      {rank:4,name:"学生向け居酒屋",category:"夜の街",description:"安くて旨い、学生街ならではの店が並ぶ",icon:"🍺"},
      {rank:3,name:"おさかな食堂",category:"グルメ",description:"新鮮な魚がリーズナブルに食べられる人気店",icon:"🐟"},
      {rank:2,name:"下高井戸駅前市場",category:"ショッピング",description:"昭和の面影が残るレトロな市場",icon:"🏮"},
      {rank:1,name:"下高井戸商店街",category:"ショッピング",description:"温かい店主たちが迎えてくれる生活密着型商店街",icon:"🛒"},
    ]
  },
  {
    slug:"gakugeidaigaku",name:"学芸大学",area:"目黒区",
    station:["学芸大学駅"],lines:["東急東横線"],
    catchcopy:"住みたい街ランキング常連の実力派",
    description:"大学は移転したが駅名は残り、今は洗練された住宅街。西口の飲食店街と東口の商店街で食のバリエーションが豊富。渋谷8分、自由が丘5分の好立地。",
    vibe:["グルメ","商店街","住みやすい","おしゃれ","穴場"],popularity:3,
    avgRent:{oneRoom:"7.8万",oneK:"9.5万",oneLDK:"15.0万"},
    bestFor:["20代後半〜30代","グルメ好き","バランス重視"],
    commuteMinutes:{"渋谷":8,"新宿":20,"東京":25,"池袋":25,"品川":18},
    spots:[
      {rank:10,name:"碑文谷公園",category:"公園・自然",description:"ボート池がある穏やかな公園",icon:"🚣"},
      {rank:9,name:"CLANN BY THE RIVER",category:"カフェ",description:"目黒川沿いのおしゃれカフェ",icon:"☕"},
      {rank:8,name:"鷹番の住宅街",category:"ランドマーク",description:"閑静な住宅街は散歩するだけで心が落ち着く",icon:"🏡"},
      {rank:7,name:"トリュフベーカリー",category:"グルメ",description:"トリュフを使った贅沢パンが名物",icon:"🍞"},
      {rank:6,name:"学大の焼き鳥屋",category:"グルメ",description:"激戦区のなかでも光る名店たち",icon:"🍢"},
      {rank:5,name:"学大横丁",category:"夜の街",description:"小さな飲み屋が並ぶ昭和情緒あふれる横丁",icon:"🏮"},
      {rank:4,name:"東急ストアの充実度",category:"生活便利",description:"深夜まで営業、日常の買い物に困らない",icon:"🛒"},
      {rank:3,name:"西口の飲食店街",category:"グルメ",description:"イタリアン、和食、中華…食のバリエーションが圧巻",icon:"🍽️"},
      {rank:2,name:"学大商店街",category:"ショッピング",description:"活気ある商店街は毎日の生活を豊かにする",icon:"🏪"},
      {rank:1,name:"住みやすさの完成形",category:"ランドマーク",description:"グルメ、交通、治安、雰囲気すべてが高水準",icon:"✨"},
    ]
  },
  {
    slug:"nishi-nippori",name:"西日暮里",area:"荒川区",
    station:["西日暮里駅"],lines:["JR山手線","東京メトロ千代田線","日暮里舎人ライナー"],
    catchcopy:"山手線で一番レトロな穴場駅",
    description:"山手線で最も知名度の低い駅の一つだが、谷中・日暮里エリアへの散歩起点として実は最高。3路線乗り入れでアクセスも良く、家賃は山手線沿線で最安クラス。",
    vibe:["穴場","下町","レトロ","コスパ","山手線"],popularity:1,
    avgRent:{oneRoom:"7.0万",oneK:"8.2万",oneLDK:"12.5万"},
    bestFor:["一人暮らし","コスパ重視","谷根千好き"],
    commuteMinutes:{"渋谷":22,"新宿":17,"東京":10,"池袋":12,"品川":18},
    spots:[
      {rank:10,name:"開成学園の桜",category:"公園・自然",description:"通学路の桜並木は春の見どころ",icon:"🌸"},
      {rank:9,name:"道灌山公園",category:"公園・自然",description:"高台から望む下町の風景",icon:"🌆"},
      {rank:8,name:"よみせ通り",category:"ショッピング",description:"谷中へ続く昔ながらの商店街",icon:"🏮"},
      {rank:7,name:"西日暮里の銭湯",category:"生活便利",description:"仕事帰りに立ち寄れる銭湯がまだ残る",icon:"♨️"},
      {rank:6,name:"にっぽり繊維街",category:"ショッピング",description:"布と手芸好きの聖地（日暮里側）",icon:"🧵"},
      {rank:5,name:"トレイン三田線弁当",category:"グルメ",description:"駅前の弁当屋は地元サラリーマンの味方",icon:"🍱"},
      {rank:4,name:"谷中散歩の起点",category:"ランドマーク",description:"谷根千エリアの散歩はここから始めるのがベスト",icon:"🚶"},
      {rank:3,name:"3路線使える利便性",category:"生活便利",description:"山手線+千代田線+舎人ライナーの三刀流",icon:"🚃"},
      {rank:2,name:"山手線最安クラスの家賃",category:"生活便利",description:"山手線沿線なのに7万円台からの家賃は驚異的",icon:"💰"},
      {rank:1,name:"穴場中の穴場",category:"ランドマーク",description:"知名度の低さこそが最大の武器。住めばわかる良さ",icon:"🏅"},
    ]
  },
  {
    slug:"futako-tamagawa",name:"二子玉川",area:"世田谷区",
    station:["二子玉川駅"],lines:["東急田園都市線","東急大井町線"],
    catchcopy:"セレブ感と多摩川の開放感",
    description:"ライズショッピングセンターの高級感と多摩川河川敷の開放感。蔦屋家電で最新ガジェットを見て、河川敷でBBQ。都会と自然が見事に両立する人気エリア。",
    vibe:["おしゃれ","自然","ファミリー","セレブ","川"],popularity:4,
    avgRent:{oneRoom:"8.0万",oneK:"9.8万",oneLDK:"15.5万"},
    bestFor:["ファミリー","カップル","自然好き"],
    commuteMinutes:{"渋谷":12,"新宿":25,"東京":30,"池袋":30,"品川":25},
    spots:[
      {rank:10,name:"玉川高島屋",category:"ショッピング",description:"日本初の郊外型百貨店の老舗",icon:"🏬"},
      {rank:9,name:"バーベキュー広場",category:"公園・自然",description:"多摩川河川敷で家族や仲間とBBQ",icon:"🍖"},
      {rank:8,name:"スターバックス二子玉川公園店",category:"カフェ",description:"リバーサイドの絶景スタバ",icon:"☕"},
      {rank:7,name:"蔦屋家電",category:"ショッピング",description:"最新家電とライフスタイル提案の融合",icon:"📱"},
      {rank:6,name:"兵庫島公園",category:"公園・自然",description:"多摩川と野川の合流点にある自然豊かな島",icon:"🏝️"},
      {rank:5,name:"109シネマズ",category:"文化・アート",description:"IMAX完備の映画館でゆったり映画鑑賞",icon:"🎬"},
      {rank:4,name:"二子玉川公園",category:"公園・自然",description:"多摩川を望む芝生広場は子供の遊び場に最適",icon:"🌳"},
      {rank:3,name:"楽天クリムゾンハウス",category:"ランドマーク",description:"楽天本社がある街の新ランドマーク",icon:"🏢"},
      {rank:2,name:"多摩川の夕焼け",category:"公園・自然",description:"河川敷から望む夕焼けは東京とは思えない美しさ",icon:"🌅"},
      {rank:1,name:"ライズショッピングセンター",category:"ショッピング",description:"映画、食事、買い物が全て揃う二子玉のシンボル",icon:"🛍️"},
    ]
  },
  {
    slug:"kitasenju",name:"北千住",area:"足立区",
    station:["北千住駅"],lines:["JR常磐線","東京メトロ千代田線","東京メトロ日比谷線","東武スカイツリーライン","つくばエクスプレス"],
    catchcopy:"5路線が交差する、下町のターミナル",
    description:"5路線利用可能な交通の要衝でありながら下町の温かさを保つ奇跡の街。大学誘致で若者も増え、飲み屋街と新しいカフェが共存する進化系下町。",
    vibe:["下町","アクセス","飲み屋","コスパ","学生街"],popularity:3,
    avgRent:{oneRoom:"6.5万",oneK:"7.5万",oneLDK:"11.5万"},
    bestFor:["一人暮らし","学生","コスパ×利便性"],
    commuteMinutes:{"渋谷":28,"新宿":25,"東京":10,"池袋":20,"品川":22},
    spots:[
      {rank:10,name:"しょうぶ沼公園",category:"公園・自然",description:"花菖蒲が美しい隠れた名所",icon:"🌺"},
      {rank:9,name:"東京電機大学周辺",category:"カフェ",description:"大学誘致で生まれた新しいカフェ群",icon:"☕"},
      {rank:8,name:"千住の銭湯",category:"生活便利",description:"10軒以上の銭湯が今も健在",icon:"♨️"},
      {rank:7,name:"やっちゃ場",category:"グルメ",description:"かつての青物市場跡地が飲食ゾーンに",icon:"🏮"},
      {rank:6,name:"北千住マルイ",category:"ショッピング",description:"駅直結の便利な商業施設",icon:"🏬"},
      {rank:5,name:"千住ほんちょう商店街",category:"ショッピング",description:"300年以上の歴史ある旧日光街道の商店街",icon:"🛒"},
      {rank:4,name:"飲み屋街の梯子酒",category:"夜の街",description:"1000円台ではしご酒できる庶民の楽園",icon:"🍺"},
      {rank:3,name:"千住のカフェ新潮流",category:"カフェ",description:"古民家カフェなど新しい波が来ている",icon:"☕"},
      {rank:2,name:"5路線使える最強アクセス",category:"生活便利",description:"都心どこでも30分以内の驚異的な交通網",icon:"🚃"},
      {rank:1,name:"北千住の懐の深さ",category:"ランドマーク",description:"新旧が自然に共存する、東京の下町最前線",icon:"✨"},
    ]
  },
  {
    slug:"monzennakacho",name:"門前仲町",area:"江東区",
    station:["門前仲町駅"],lines:["東京メトロ東西線","都営大江戸線"],
    catchcopy:"深川不動と人情の下町酒場",
    description:"深川不動堂と富岡八幡宮の門前町として栄えた歴史ある街。永代通り沿いの飲み屋街は東京屈指の酒場天国。東西線で大手町まで直通12分の好アクセスも魅力。",
    vibe:["下町","飲み屋","寺社","人情","アクセス"],popularity:2,
    avgRent:{oneRoom:"8.0万",oneK:"9.5万",oneLDK:"14.0万"},
    bestFor:["飲み歩き好き","大手町勤務","下町好き"],
    commuteMinutes:{"渋谷":25,"新宿":25,"東京":12,"池袋":28,"品川":20},
    spots:[
      {rank:10,name:"深川めし",category:"グルメ",description:"あさりの炊き込みご飯は下町の味",icon:"🍚"},
      {rank:9,name:"越中島公園",category:"公園・自然",description:"隅田川沿いの静かな公園",icon:"🌳"},
      {rank:8,name:"深川江戸資料館",category:"文化・アート",description:"江戸時代の深川を体感できる",icon:"🏯"},
      {rank:7,name:"辰巳新道",category:"夜の街",description:"超ディープな飲み屋横丁",icon:"🏮"},
      {rank:6,name:"深川不動堂",category:"ランドマーク",description:"護摩焚きの音が響く力強い祈りの場所",icon:"🔥"},
      {rank:5,name:"成田山新勝寺東京別院",category:"ランドマーク",description:"梵字で覆われた外壁は圧巻",icon:"⛩️"},
      {rank:4,name:"深川ワイナリー",category:"グルメ",description:"下町でワインを醸造するユニークな試み",icon:"🍷"},
      {rank:3,name:"永代通りの酒場群",category:"夜の街",description:"飲み歩きの聖地、個性的な店が何十軒も",icon:"🍶"},
      {rank:2,name:"富岡八幡宮",category:"ランドマーク",description:"江戸最大の八幡宮、深川祭は必見",icon:"⛩️"},
      {rank:1,name:"門仲の人情",category:"ランドマーク",description:"常連じゃなくても温かく迎えてくれる、それが門仲",icon:"❤️"},
    ]
  },
  {
    slug:"mishuku",name:"三宿",area:"世田谷区",
    station:["三軒茶屋駅","池尻大橋駅"],lines:["東急田園都市線"],
    catchcopy:"大人だけが知っている隠れ家タウン",
    description:"最寄り駅まで徒歩10分超という不便さが逆にフィルターとなり、知る人ぞ知る大人の隠れ家が点在。世田谷公園に隣接し、緑も豊か。",
    vibe:["隠れ家","大人","穴場","カフェ","静か"],popularity:1,
    avgRent:{oneRoom:"8.5万",oneK:"10.0万",oneLDK:"16.0万"},
    bestFor:["30代〜40代","隠れ家好き","車持ち"],
    commuteMinutes:{"渋谷":10,"新宿":20,"東京":25,"池袋":28,"品川":20},
    spots:[
      {rank:10,name:"三宿の住宅街",category:"ランドマーク",description:"緑が多く静かな高級住宅地",icon:"🏡"},
      {rank:9,name:"IID 世田谷ものづくり学校",category:"文化・アート",description:"廃校をリノベした創造空間",icon:"🏫"},
      {rank:8,name:"246沿いのカフェ",category:"カフェ",description:"国道246沿いにおしゃれカフェが点在",icon:"☕"},
      {rank:7,name:"世田谷公園のプレーパーク",category:"公園・自然",description:"子供が泥だらけで遊べる自由な場",icon:"🌿"},
      {rank:6,name:"三宿通り",category:"ランドマーク",description:"並木道が美しい三宿のメインストリート",icon:"🌳"},
      {rank:5,name:"RAIN ON THE ROOF",category:"グルメ",description:"三宿を代表するダイニングバー",icon:"🍷"},
      {rank:4,name:"Boulangerie Bonheur",category:"グルメ",description:"地元民に愛されるパン屋",icon:"🥐"},
      {rank:3,name:"世田谷公園",category:"公園・自然",description:"SLが展示されている広々とした公園",icon:"🚂"},
      {rank:2,name:"隠れ家レストラン群",category:"グルメ",description:"看板のない名店が路地裏に潜む",icon:"🍽️"},
      {rank:1,name:"駅から遠い贅沢",category:"ランドマーク",description:"不便さが生む静けさと上質さ。大人の特権",icon:"✨"},
    ]
  },
  {
    slug:"nezu",name:"根津",area:"文京区",
    station:["根津駅"],lines:["東京メトロ千代田線"],
    catchcopy:"つつじの丘と、昭和の路地裏",
    description:"根津神社のつつじまつりで知られる文京区の下町。谷根千（谷中・根津・千駄木）エリアの一角で、古い木造建築が残る路地裏散歩が楽しい。東大のおひざ元でもあり知的な空気も漂う。",
    vibe:["下町","寺社","散歩","レトロ","穴場"],popularity:2,
    avgRent:{oneRoom:"7.5万",oneK:"9.0万",oneLDK:"13.5万"},
    bestFor:["散歩好き","文化好き","静かに暮らしたい人"],
    commuteMinutes:{"渋谷":22,"新宿":18,"東京":10,"池袋":12,"品川":20},
    spots:[
      {rank:10,name:"東京大学キャンパス",category:"ランドマーク",description:"安田講堂やイチョウ並木は一般散歩もOK",icon:"🏛️"},
      {rank:9,name:"根津のたいやき",category:"グルメ",description:"薄皮パリパリの行列たいやき",icon:"🐟"},
      {rank:8,name:"はん亭",category:"グルメ",description:"築90年の建物で食べる串揚げの名店",icon:"🍢"},
      {rank:7,name:"不忍通りふれあい館",category:"生活便利",description:"地域コミュニティの拠点",icon:"🏠"},
      {rank:6,name:"ヘビ道",category:"ランドマーク",description:"藍染川の暗渠跡がくねくねと続く路地",icon:"🐍"},
      {rank:5,name:"根津の路地裏散歩",category:"ランドマーク",description:"曲がるたびに新しい発見がある迷路のような路地",icon:"🗺️"},
      {rank:4,name:"根津教会",category:"ランドマーク",description:"下町に佇むレトロな教会建築",icon:"⛪"},
      {rank:3,name:"谷根千の古民家カフェ",category:"カフェ",description:"築100年の建物で頂くコーヒー",icon:"☕"},
      {rank:2,name:"根津神社のつつじ",category:"公園・自然",description:"約3000株のつつじが咲き誇る圧巻の春景色",icon:"🌺"},
      {rank:1,name:"根津神社",category:"ランドマーク",description:"1900年前創建の古社。千本鳥居は東京の伏見稲荷",icon:"⛩️"},
    ]
  },
  {
    slug:"kuramae",name:"蔵前",area:"台東区",
    station:["蔵前駅"],lines:["都営浅草線","都営大江戸線"],
    catchcopy:"東京のブルックリン、ものづくりの街",
    description:"かつての米蔵が並んだ問屋街が、今やクラフトショップとロースタリーが集まるおしゃれエリアに変貌。\"東京のブルックリン\"と呼ばれ、ものづくり精神が息づく。",
    vibe:["クラフト","コーヒー","リノベ","穴場","ものづくり"],popularity:2,
    avgRent:{oneRoom:"8.5万",oneK:"10.0万",oneLDK:"14.5万"},
    bestFor:["クリエイター","ものづくり好き","コーヒー好き"],
    commuteMinutes:{"渋谷":28,"新宿":25,"東京":10,"池袋":25,"品川":20},
    spots:[
      {rank:10,name:"カキモリ",category:"ショッピング",description:"自分だけのノートが作れる文具店",icon:"📓"},
      {rank:9,name:"CAMERA",category:"カフェ",description:"倉庫リノベのギャラリーカフェ",icon:"📷"},
      {rank:8,name:"結わえる本店",category:"グルメ",description:"寝かせ玄米のヘルシーな定食",icon:"🍚"},
      {rank:7,name:"SyuRo",category:"ショッピング",description:"オリジナルプロダクトが美しい蔵前の顔",icon:"🏭"},
      {rank:6,name:"駒形どぜう",category:"グルメ",description:"200年以上続くどじょう鍋の老舗",icon:"🍲"},
      {rank:5,name:"隅田川テラス",category:"公園・自然",description:"スカイツリーを望む水辺の散歩道",icon:"🌉"},
      {rank:4,name:"Nui. HOSTEL & BAR LOUNGE",category:"カフェ",description:"倉庫リノベのホステル併設バーは旅人の集う場所",icon:"🍺"},
      {rank:3,name:"LEAVES COFFEE ROASTERS",category:"カフェ",description:"自家焙煎の本格スペシャルティコーヒー",icon:"☕"},
      {rank:2,name:"蔵前の革工房",category:"ショッピング",description:"職人が手作りする革小物は世界に一つだけ",icon:"👜"},
      {rank:1,name:"ダンデライオン・チョコレート",category:"カフェ",description:"Bean to Barのクラフトチョコレートが蔵前の象徴",icon:"🍫"},
    ]
  },
  {
    slug:"akabane",name:"赤羽",area:"北区",
    station:["赤羽駅"],lines:["JR京浜東北線","JR埼京線","JR湘南新宿ライン","JR上野東京ライン"],
    catchcopy:"昼飲みの聖地、人情あふれるカオスタウン",
    description:"「赤羽は東京のオアシス」と語る人多数。駅前一番街の昼飲み文化はテレビでも話題。4路線利用可能な交通の要衝でありながら家賃は手頃。治安の噂は昔の話で今はファミリーも多い。",
    vibe:["飲み屋","下町","コスパ","アクセス","人情"],popularity:3,
    avgRent:{oneRoom:"6.5万",oneK:"7.8万",oneLDK:"11.5万"},
    bestFor:["飲み歩き好き","コスパ重視","埼玉勤務"],
    commuteMinutes:{"渋谷":22,"新宿":15,"東京":18,"池袋":10,"品川":25},
    spots:[
      {rank:10,name:"荒川の土手",category:"公園・自然",description:"映画のロケにも使われる広大な河川敷",icon:"🌅"},
      {rank:9,name:"LaLaガーデン",category:"ショッピング",description:"駅直結の商業施設で日常の買い物も充実",icon:"🏬"},
      {rank:8,name:"赤羽八幡神社",category:"ランドマーク",description:"新幹線が境内の下を通る珍しい神社",icon:"⛩️"},
      {rank:7,name:"いこい",category:"グルメ",description:"朝7時から開いてる立ち飲みの聖地",icon:"🍶"},
      {rank:6,name:"まるます家",category:"グルメ",description:"朝9時開店、ジャンボメンチカツが名物",icon:"🥩"},
      {rank:5,name:"シルクロード商店街",category:"ショッピング",description:"多国籍な店が並ぶカオスな商店街",icon:"🌍"},
      {rank:4,name:"赤羽自然観察公園",category:"公園・自然",description:"旧陸軍の敷地跡に作られた自然豊かな公園",icon:"🌿"},
      {rank:3,name:"4路線の交通利便性",category:"生活便利",description:"池袋10分、新宿15分、東京18分の最強アクセス",icon:"🚃"},
      {rank:2,name:"OK横丁",category:"夜の街",description:"ディープな飲み屋が軒を連ねる昭和の横丁",icon:"🏮"},
      {rank:1,name:"赤羽一番街",category:"夜の街",description:"昼から飲める赤ちょうちんの聖地。赤羽の代名詞",icon:"🍺"},
    ]
  },
  {
    slug:"nakano",name:"中野",area:"中野区",
    station:["中野駅"],lines:["JR中央線","東京メトロ東西線"],
    catchcopy:"サブカルの聖地は、実は住みやすい",
    description:"中野ブロードウェイのイメージが強いが、実は新宿まで5分の好立地で商店街も充実した住みやすい街。中央線と東西線の2路線使えて利便性も抜群。再開発でさらに進化中。",
    vibe:["サブカル","アクセス","商店街","コスパ","再開発"],popularity:4,
    avgRent:{oneRoom:"7.0万",oneK:"8.5万",oneLDK:"13.5万"},
    bestFor:["一人暮らし","サブカル好き","新宿勤務"],
    commuteMinutes:{"渋谷":14,"新宿":5,"東京":20,"池袋":15,"品川":22},
    spots:[
      {rank:10,name:"中野四季の森公園",category:"公園・自然",description:"再開発で生まれた広大な芝生公園",icon:"🌳"},
      {rank:9,name:"中野セントラルパーク",category:"ランドマーク",description:"緑とオフィスが共存する再開発エリア",icon:"🏢"},
      {rank:8,name:"薬師あいロード商店街",category:"ショッピング",description:"昔ながらの商店街は地元民の台所",icon:"🛒"},
      {rank:7,name:"哲学堂公園",category:"公園・自然",description:"哲学者が造った不思議な公園",icon:"🤔"},
      {rank:6,name:"中野の飲み屋街",category:"夜の街",description:"北口レンガ坂周辺はディープな飲み屋天国",icon:"🍺"},
      {rank:5,name:"まんだらけ",category:"ショッピング",description:"ブロードウェイの核、日本最大の中古漫画店",icon:"📚"},
      {rank:4,name:"中野サンモール",category:"ショッピング",description:"駅からブロードウェイまで続くアーケード商店街",icon:"🌂"},
      {rank:3,name:"新宿まで5分",category:"生活便利",description:"中央線特快で新宿5分。通勤最強クラス",icon:"🚃"},
      {rank:2,name:"中野の住みやすさ",category:"生活便利",description:"家賃手頃・交通便利・買い物充実の三拍子",icon:"🏡"},
      {rank:1,name:"中野ブロードウェイ",category:"ショッピング",description:"サブカルの聖地。マニアックな専門店が4フロアに",icon:"🎮"},
    ]
  },
  {
    slug:"ningyocho",name:"人形町",area:"中央区",
    station:["人形町駅"],lines:["東京メトロ日比谷線","都営浅草線"],
    catchcopy:"老舗と甘酒が薫る、日本橋の下町",
    description:"甘酒横丁を中心に200年以上の老舗が並ぶ日本橋の下町。人形焼や玉子焼きの名店が健在で、都心でありながら人情味あふれる商店街文化が残る。東京駅にも近く通勤にも便利。",
    vibe:["老舗","下町","グルメ","歴史","都心"],popularity:2,
    avgRent:{oneRoom:"9.5万",oneK:"11.0万",oneLDK:"16.5万"},
    bestFor:["グルメ好き","都心勤務","歴史好き"],
    commuteMinutes:{"渋谷":22,"新宿":22,"東京":8,"池袋":22,"品川":18},
    spots:[
      {rank:10,name:"水天宮",category:"ランドマーク",description:"安産祈願で有名な神社は妊婦さんの聖地",icon:"⛩️"},
      {rank:9,name:"明治座",category:"文化・アート",description:"歌舞伎や演劇が楽しめる老舗劇場",icon:"🎭"},
      {rank:8,name:"重盛永信堂",category:"グルメ",description:"行列必至の人形焼は人形町の看板",icon:"🍡"},
      {rank:7,name:"谷や",category:"グルメ",description:"ミシュラン蕎麦の名店",icon:"🍜"},
      {rank:6,name:"浜町公園",category:"公園・自然",description:"隅田川沿いの広々とした区民の憩い場",icon:"🌳"},
      {rank:5,name:"小網神社",category:"ランドマーク",description:"強運厄除けのパワースポット、東京銭洗弁天",icon:"💰"},
      {rank:4,name:"人形町の老舗巡り",category:"グルメ",description:"鯛焼き、親子丼、すき焼き…名店のオンパレード",icon:"🍽️"},
      {rank:3,name:"柳屋の鯛焼き",category:"グルメ",description:"大正5年創業、東京三大鯛焼きの一角",icon:"🐟"},
      {rank:2,name:"玉ひでの親子丼",category:"グルメ",description:"親子丼発祥の店は行列してでも食べる価値あり",icon:"🍗"},
      {rank:1,name:"甘酒横丁",category:"ショッピング",description:"老舗と人情が詰まった人形町のメインストリート",icon:"🏮"},
    ]
  },
  {
    slug:"zoshigaya",name:"雑司が谷",area:"豊島区",
    station:["雑司が谷駅","鬼子母神前停留場"],lines:["東京メトロ副都心線","都電荒川線"],
    catchcopy:"都電が走る、池袋の隣の別世界",
    description:"池袋から1駅なのに別世界のような静けさ。都電荒川線が走る風情ある街並みと鬼子母神の大銀杏、手創り市が人気。池袋の喧騒から逃れたい人の穴場。",
    vibe:["穴場","静か","都電","寺社","レトロ"],popularity:1,
    avgRent:{oneRoom:"7.0万",oneK:"8.5万",oneLDK:"13.0万"},
    bestFor:["静かに暮らしたい人","池袋勤務","散歩好き"],
    commuteMinutes:{"渋谷":12,"新宿":8,"東京":18,"池袋":3,"品川":22},
    spots:[
      {rank:10,name:"雑司が谷墓地",category:"ランドマーク",description:"夏目漱石やジョン万次郎が眠る歴史ある墓地",icon:"🪦"},
      {rank:9,name:"南池袋公園",category:"公園・自然",description:"芝生広場とカフェがある都会のオアシス（徒歩圏）",icon:"🌿"},
      {rank:8,name:"旧宣教師館",category:"文化・アート",description:"明治時代の洋館は無料で見学可能",icon:"🏛️"},
      {rank:7,name:"都電荒川線の旅",category:"ランドマーク",description:"レトロな路面電車で早稲田〜三ノ輪橋を旅する",icon:"🚋"},
      {rank:6,name:"目白通りのカフェ",category:"カフェ",description:"静かな通り沿いに隠れた名カフェが点在",icon:"☕"},
      {rank:5,name:"雑司が谷旧居",category:"文化・アート",description:"永井荷風ゆかりの地を文学散歩",icon:"📖"},
      {rank:4,name:"池袋まで徒歩圏",category:"生活便利",description:"池袋のあらゆる施設を徒歩で使える好立地",icon:"🚶"},
      {rank:3,name:"鬼子母神の手創り市",category:"イベント",description:"毎月開催、クラフト作家の手作り品に出会える",icon:"🎨"},
      {rank:2,name:"鬼子母神の大銀杏",category:"公園・自然",description:"樹齢700年の大銀杏は秋に圧巻の黄金色に",icon:"🌳"},
      {rank:1,name:"鬼子母神堂",category:"ランドマーク",description:"安産・子育ての神様。境内の静けさは都心とは思えない",icon:"⛩️"},
    ]
  },
  {
    slug:"jiyugaoka",name:"自由が丘",area:"目黒区",
    station:["自由が丘駅"],lines:["東急東横線","東急大井町線"],
    catchcopy:"スイーツと雑貨の楽園",
    description:"ヨーロッパのような石畳の小道にパティスリーとセレクトショップが並ぶ、東京屈指のおしゃれタウン。九品仏川緑道の散歩も気持ちよく、渋谷・横浜どちらにもアクセス良好。",
    vibe:["おしゃれ","スイーツ","雑貨","カフェ","散歩"],popularity:5,
    avgRent:{oneRoom:"7.8万",oneK:"9.5万",oneLDK:"15.5万"},
    bestFor:["カップル","スイーツ好き","雑貨好き"],
    commuteMinutes:{"渋谷":10,"新宿":22,"東京":28,"池袋":28,"品川":18},
    spots:[
      {rank:10,name:"ヴェニスの小道",category:"ランドマーク",description:"ヨーロッパの裏路地のような石畳の通り",icon:"🇮🇹"},
      {rank:9,name:"古桑庵",category:"カフェ",description:"築80年の古民家で抹茶と和菓子を楽しむ",icon:"🍵"},
      {rank:8,name:"La Vita",category:"ランドマーク",description:"ベネチアを模した撮影スポット",icon:"📸"},
      {rank:7,name:"九品仏川緑道",category:"公園・自然",description:"桜並木が続く緑のプロムナード",icon:"🌸"},
      {rank:6,name:"TODAY'S SPECIAL",category:"ショッピング",description:"暮らしにまつわるおしゃれ雑貨のセレクトショップ",icon:"🛍️"},
      {rank:5,name:"モンサンクレール",category:"グルメ",description:"辻口博啓シェフの洋菓子店は自由が丘の代名詞",icon:"🍰"},
      {rank:4,name:"マリクレール通り",category:"ショッピング",description:"おしゃれなカフェとブティックが並ぶメインストリート",icon:"🛍️"},
      {rank:3,name:"自由が丘デパート",category:"ショッピング",description:"日本初のセルフサービス型デパートは昭和レトロ",icon:"🏬"},
      {rank:2,name:"パティスリー巡り",category:"グルメ",description:"20以上のパティスリーが競い合う日本一のスイーツ激戦区",icon:"🎂"},
      {rank:1,name:"自由が丘の街並み",category:"ランドマーク",description:"石畳と緑とスイーツが織りなす、東京一おしゃれな街歩き",icon:"✨"},
    ]
  },
  {
    slug:"toritsudaigaku",name:"都立大学",area:"目黒区",
    station:["都立大学駅"],lines:["東急東横線"],
    catchcopy:"品の良さと暮らしやすさの最適解",
    description:"自由が丘と学芸大学の間にある落ち着いた住宅街。すずかけ通りの並木道が美しく、ちょうど良い商店街と公園のバランスが絶妙。子育て世帯にも人気。",
    vibe:["住みやすい","静か","並木道","ファミリー","穴場"],popularity:2,
    avgRent:{oneRoom:"7.5万",oneK:"9.0万",oneLDK:"14.5万"},
    bestFor:["ファミリー","30代カップル","バランス重視"],
    commuteMinutes:{"渋谷":10,"新宿":22,"東京":28,"池袋":28,"品川":20},
    spots:[
      {rank:10,name:"めぐろ区民キャンパス",category:"生活便利",description:"図書館・ホール・体育館が集まる複合施設",icon:"🏛️"},
      {rank:9,name:"氷川神社",category:"ランドマーク",description:"住宅街に佇む静かな神社",icon:"⛩️"},
      {rank:8,name:"柿の木坂",category:"ランドマーク",description:"高級住宅街の坂道は散歩に最適",icon:"🚶"},
      {rank:7,name:"パティスリー ジュンウジタ",category:"グルメ",description:"フランス仕込みの本格スイーツ",icon:"🍰"},
      {rank:6,name:"すずかけ通りのカフェ",category:"カフェ",description:"並木道沿いの穏やかなカフェタイム",icon:"☕"},
      {rank:5,name:"駒場公園",category:"公園・自然",description:"旧前田侯爵邸のある静かな公園（少し歩く）",icon:"🌿"},
      {rank:4,name:"都立大の商店街",category:"ショッピング",description:"必要なものは全部揃う、ちょうどいい商店街",icon:"🛒"},
      {rank:3,name:"自由が丘・学芸大学への散歩",category:"ランドマーク",description:"両隣の人気駅まで歩ける好立地",icon:"🚶"},
      {rank:2,name:"すずかけ通り",category:"公園・自然",description:"プラタナスの並木が美しい東横線沿いのメインストリート",icon:"🌳"},
      {rank:1,name:"過不足のない暮らし",category:"ランドマーク",description:"華やかすぎず地味すぎない、暮らしの最適解がここに",icon:"🏡"},
    ]
  },
  // ===== ここから追加20街 (31-50) =====
  {
    slug:"hatagaya",name:"幡ヶ谷",area:"渋谷区",
    station:["幡ヶ谷駅"],lines:["京王新線"],
    catchcopy:"渋谷区なのに、肩の力が抜ける街",
    description:"新宿まで1駅の好立地でありながら、六号通り商店街を中心にのんびりした空気が流れる。渋谷区アドレスの割に家賃も手頃で、個性派カフェや自然食品店が点在する穴場。",
    vibe:["穴場","商店街","自然食","渋谷区","コスパ"],popularity:1,
    avgRent:{oneRoom:"7.8万",oneK:"9.5万",oneLDK:"15.0万"},
    bestFor:["20代一人暮らし","コスパ重視","自然派"],
    commuteMinutes:{"渋谷":8,"新宿":5,"東京":22,"池袋":18,"品川":22},
    spots:[
      {rank:10,name:"六号通り商店街",category:"ショッピング",description:"日用品から飲食まで揃う昔ながらの商店街",icon:"🛒"},
      {rank:9,name:"幡ヶ谷六号坂通り公園",category:"公園・自然",description:"子供も遊べる商店街脇の小さな公園",icon:"🌿"},
      {rank:8,name:"オーガニック食品店",category:"ショッピング",description:"自然食品・無農薬野菜の専門店が複数",icon:"🥬"},
      {rank:7,name:"笹塚ボウル方面散歩",category:"ランドマーク",description:"笹塚方面へ歩けばレトロな娯楽も",icon:"🎳"},
      {rank:6,name:"氷川神社",category:"ランドマーク",description:"住宅街に佇む静かな氏神様",icon:"⛩️"},
      {rank:5,name:"個性派コーヒースタンド",category:"カフェ",description:"サードウェーブ系の小さなコーヒー店が点在",icon:"☕"},
      {rank:4,name:"西原エリア",category:"ランドマーク",description:"代々木上原方面の閑静な高級住宅街",icon:"🏡"},
      {rank:3,name:"渋谷区アドレスの家賃",category:"生活便利",description:"渋谷区で7万円台〜は驚きのコスパ",icon:"💰"},
      {rank:2,name:"新宿1駅の利便性",category:"生活便利",description:"京王新線で新宿まで約5分の好アクセス",icon:"🚃"},
      {rank:1,name:"肩の力が抜ける空気感",category:"ランドマーク",description:"渋谷区なのにギラつかない、等身大の暮らし",icon:"😌"},
    ]
  },
  {
    slug:"oyamadai",name:"尾山台",area:"世田谷区",
    station:["尾山台駅"],lines:["東急大井町線"],
    catchcopy:"ハッピーロードが待つ、笑顔の商店街タウン",
    description:"「尾山台ハッピーロード」と名付けられた商店街が駅前から伸び、個人商店と活気が残る世田谷の下町。等々力渓谷も徒歩圏内で自然も近い。",
    vibe:["商店街","下町","世田谷","等々力渓谷","ファミリー"],popularity:1,
    avgRent:{oneRoom:"6.8万",oneK:"8.5万",oneLDK:"13.0万"},
    bestFor:["ファミリー","商店街好き","自然が近い暮らし"],
    commuteMinutes:{"渋谷":18,"新宿":28,"東京":35,"池袋":35,"品川":25},
    spots:[
      {rank:10,name:"東京都市大学",category:"ランドマーク",description:"学生の街としての一面もある",icon:"🎓"},
      {rank:9,name:"玉川野毛町公園",category:"公園・自然",description:"古墳もある緑豊かな公園",icon:"🌿"},
      {rank:8,name:"手作りパン屋さん",category:"グルメ",description:"商店街に点在する個性的なベーカリー",icon:"🍞"},
      {rank:7,name:"世田谷のんびり散歩",category:"ランドマーク",description:"碁盤の目の住宅街を気ままに散策",icon:"🚶"},
      {rank:6,name:"等々力渓谷",category:"公園・自然",description:"東京23区唯一の渓谷が徒歩圏内",icon:"🏞️"},
      {rank:5,name:"おざわ（和菓子）",category:"グルメ",description:"地元で愛される手作り和菓子の名店",icon:"🍡"},
      {rank:4,name:"二子玉川へ散歩",category:"ランドマーク",description:"大井町線で1駅、歩いても行ける二子玉川",icon:"🛍️"},
      {rank:3,name:"個人商店の温かさ",category:"ショッピング",description:"八百屋・魚屋・惣菜屋…対面販売が残る温もり",icon:"🤝"},
      {rank:2,name:"ハッピーロード商店街",category:"ショッピング",description:"全長約500mの活気ある商店街",icon:"🎉"},
      {rank:1,name:"笑顔が生まれる日常",category:"ランドマーク",description:"商店街で「いつもの」が言えるようになる街",icon:"😊"},
    ]
  },
  {
    slug:"iriya",name:"入谷",area:"台東区",
    station:["入谷駅"],lines:["東京メトロ日比谷線"],
    catchcopy:"浅草の隣、知られざる下町の懐",
    description:"浅草から一駅、観光客が来ない静かな下町。昔ながらの長屋風建築が残り、朝顔市で有名な入谷鬼子母神がシンボル。上野も浅草も徒歩圏内で、実は最強の立地。",
    vibe:["下町","レトロ","浅草近く","穴場","職人"],popularity:1,
    avgRent:{oneRoom:"7.5万",oneK:"9.0万",oneLDK:"13.5万"},
    bestFor:["下町好き","20代一人暮らし","アクセス重視"],
    commuteMinutes:{"渋谷":25,"新宿":22,"東京":15,"池袋":20,"品川":25},
    spots:[
      {rank:10,name:"かっぱ橋道具街",category:"ショッピング",description:"プロ御用達の調理器具が揃う商店街が徒歩圏",icon:"🍳"},
      {rank:9,name:"下町の銭湯",category:"生活便利",description:"昔ながらの銭湯がまだ残る",icon:"♨️"},
      {rank:8,name:"入谷の路地裏",category:"ランドマーク",description:"昭和の面影が色濃く残る細い路地",icon:"🏚️"},
      {rank:7,name:"浅草徒歩圏",category:"ランドマーク",description:"仲見世も雷門も歩いて行ける贅沢",icon:"⛩️"},
      {rank:6,name:"上野公園・美術館群",category:"文化・アート",description:"上野も徒歩圏、文化施設に事欠かない",icon:"🎨"},
      {rank:5,name:"台東区の下町グルメ",category:"グルメ",description:"安くて旨い食堂・定食屋が点在",icon:"🍚"},
      {rank:4,name:"鷲神社（おとりさま）",category:"ランドマーク",description:"酉の市で有名な神社も近い",icon:"🦅"},
      {rank:3,name:"入谷朝顔市",category:"イベント",description:"毎年7月の風物詩、入谷鬼子母神の朝顔まつり",icon:"🌺"},
      {rank:2,name:"入谷鬼子母神",category:"ランドマーク",description:"「恐れ入谷の鬼子母神」で有名な寺院",icon:"🙏"},
      {rank:1,name:"観光地の隣の日常",category:"ランドマーク",description:"浅草の喧騒から一歩入った、穏やかな暮らし",icon:"🏡"},
    ]
  },
  {
    slug:"todaimae",name:"東大前",area:"文京区",
    station:["東大前駅"],lines:["東京メトロ南北線"],
    catchcopy:"知の森に抱かれた、静かな文教エリア",
    description:"東京大学本郷キャンパスの目の前。銀杏並木やレンガ造りの建築が美しく、学生向けの安い飲食店や古書店が点在。根津・千駄木にも歩いて行ける。",
    vibe:["文教","アカデミック","静か","古書","歴史"],popularity:1,
    avgRent:{oneRoom:"7.5万",oneK:"9.5万",oneLDK:"14.0万"},
    bestFor:["学生","研究者","読書好き"],
    commuteMinutes:{"渋谷":20,"新宿":18,"東京":12,"池袋":10,"品川":25},
    spots:[
      {rank:10,name:"弥生美術館",category:"文化・アート",description:"竹久夢二の作品を中心とした個性的な美術館",icon:"🎨"},
      {rank:9,name:"学生食堂",category:"グルメ",description:"東大の学食は一般開放、安くて量が多い",icon:"🍚"},
      {rank:8,name:"本郷通りの古書店",category:"ショッピング",description:"学術書から文芸書まで揃う古書の宝庫",icon:"📚"},
      {rank:7,name:"根津・千駄木散歩",category:"ランドマーク",description:"谷根千エリアへ歩いて下町情緒を楽しめる",icon:"🚶"},
      {rank:6,name:"東大赤門",category:"ランドマーク",description:"加賀藩上屋敷の門、重要文化財",icon:"🚪"},
      {rank:5,name:"安田講堂",category:"ランドマーク",description:"東大のシンボル的建築",icon:"🏛️"},
      {rank:4,name:"文京区の治安",category:"生活便利",description:"都内屈指の治安の良さ",icon:"🛡️"},
      {rank:3,name:"銀杏並木の秋",category:"公園・自然",description:"11月の黄金色の銀杏トンネルは圧巻",icon:"🍂"},
      {rank:2,name:"東大構内散歩",category:"公園・自然",description:"緑豊かなキャンパスは最高の散歩コース",icon:"🌿"},
      {rank:1,name:"知の空気に包まれた暮らし",category:"ランドマーク",description:"毎日アカデミックな空気を吸える贅沢",icon:"🎓"},
    ]
  },
  {
    slug:"hakusan",name:"白山",area:"文京区",
    station:["白山駅"],lines:["都営三田線"],
    catchcopy:"坂と緑と学問の、文京区の穴場",
    description:"東洋大学のお膝元で学生街の側面と、白山神社のあじさいで知られる文教エリア。本駒込・千石方面は閑静な住宅街で、巣鴨にも近い。",
    vibe:["文教","穴場","あじさい","学生街","コスパ"],popularity:1,
    avgRent:{oneRoom:"7.0万",oneK:"8.8万",oneLDK:"13.0万"},
    bestFor:["学生","20代一人暮らし","コスパ重視"],
    commuteMinutes:{"渋谷":22,"新宿":18,"東京":15,"池袋":10,"品川":25},
    spots:[
      {rank:10,name:"東洋大学",category:"ランドマーク",description:"白山キャンパスが街の活気を生む",icon:"🎓"},
      {rank:9,name:"小石川植物園",category:"公園・自然",description:"東大附属の歴史ある植物園が近い",icon:"🌺"},
      {rank:8,name:"学生向け定食屋",category:"グルメ",description:"安くて量が多い食堂が点在",icon:"🍚"},
      {rank:7,name:"巣鴨への散歩",category:"ランドマーク",description:"おばあちゃんの原宿こと巣鴨も徒歩圏",icon:"🚶"},
      {rank:6,name:"白山通り",category:"ランドマーク",description:"飲食店やチェーン店が並ぶメインストリート",icon:"🛣️"},
      {rank:5,name:"六義園",category:"公園・自然",description:"少し歩けば名園に出会える",icon:"🍁"},
      {rank:4,name:"文京区の教育環境",category:"生活便利",description:"名門校が集まる文教地区ならではの環境",icon:"📖"},
      {rank:3,name:"白山神社",category:"ランドマーク",description:"あじさいまつりで有名、縁結びのパワースポット",icon:"⛩️"},
      {rank:2,name:"あじさいまつり",category:"イベント",description:"6月の白山神社は3000株のあじさいが咲き誇る",icon:"💐"},
      {rank:1,name:"文教区の穴場感",category:"ランドマーク",description:"文京区アドレスで7万円台、知る人ぞ知る好立地",icon:"💎"},
    ]
  },
  {
    slug:"chitosefunabashi",name:"千歳船橋",area:"世田谷区",
    station:["千歳船橋駅"],lines:["小田急線"],
    catchcopy:"世田谷の日常が詰まった、安心タウン",
    description:"経堂と祖師ヶ谷大蔵の間にある世田谷の住宅街。駅前商店街は生活密着型で、馬事公苑や砧公園が徒歩圏内。派手さはないが暮らしやすさは抜群。",
    vibe:["住みやすい","世田谷","公園","商店街","ファミリー"],popularity:1,
    avgRent:{oneRoom:"6.5万",oneK:"8.0万",oneLDK:"12.5万"},
    bestFor:["ファミリー","30代カップル","静かに暮らしたい人"],
    commuteMinutes:{"渋谷":18,"新宿":15,"東京":30,"池袋":28,"品川":28},
    spots:[
      {rank:10,name:"世田谷文学館",category:"文化・アート",description:"文学に触れられる区立の静かな施設",icon:"📖"},
      {rank:9,name:"ウルトラマン商店街（祖師ヶ谷大蔵）",category:"ショッピング",description:"隣駅のユニークな商店街も散歩圏内",icon:"🦸"},
      {rank:8,name:"経堂コルティ",category:"ショッピング",description:"隣駅・経堂の駅ビルも日常使いに便利",icon:"🏬"},
      {rank:7,name:"千歳船橋の商店街",category:"ショッピング",description:"スーパー・ドラッグストア・飲食店が揃う生活商店街",icon:"🛒"},
      {rank:6,name:"環八通り沿いの飲食店",category:"グルメ",description:"チェーンから個人店まで食の選択肢が豊富",icon:"🍽️"},
      {rank:5,name:"馬事公苑",category:"公園・自然",description:"馬術競技場と広大な緑地",icon:"🐴"},
      {rank:4,name:"小田急線の便利さ",category:"生活便利",description:"新宿まで各停でも約15分の好アクセス",icon:"🚃"},
      {rank:3,name:"世田谷区の子育て環境",category:"生活便利",description:"公園も保育園も充実した子育て支援",icon:"👶"},
      {rank:2,name:"砧公園",category:"公園・自然",description:"広大な芝生とファミリーパークが最高の週末を演出",icon:"🌳"},
      {rank:1,name:"当たり前が全部揃う安心感",category:"ランドマーク",description:"必要なものは全部ある、世田谷の理想的な日常",icon:"🏡"},
    ]
  },
  {
    slug:"yoga",name:"用賀",area:"世田谷区",
    station:["用賀駅"],lines:["東急田園都市線"],
    catchcopy:"緑と利便性が同居する、田園都市線の良心",
    description:"渋谷まで田園都市線で15分。砧公園の最寄り駅で、世田谷ビジネススクエアを持つ複合的な街。落ち着いた住宅街と緑のバランスが絶妙。",
    vibe:["緑","住みやすい","ファミリー","砧公園","落ち着き"],popularity:2,
    avgRent:{oneRoom:"7.2万",oneK:"9.0万",oneLDK:"14.0万"},
    bestFor:["ファミリー","30代カップル","自然好き"],
    commuteMinutes:{"渋谷":15,"新宿":25,"東京":32,"池袋":30,"品川":25},
    spots:[
      {rank:10,name:"世田谷ビジネススクエア",category:"ランドマーク",description:"オフィス・商業の複合施設が駅直結",icon:"🏢"},
      {rank:9,name:"用賀プロムナード",category:"公園・自然",description:"いらか道と呼ばれる遊歩道を砧公園まで",icon:"🚶"},
      {rank:8,name:"中町の住宅街",category:"ランドマーク",description:"緑が豊かな閑静な住宅エリア",icon:"🏡"},
      {rank:7,name:"スーパー・商業施設",category:"生活便利",description:"OKストアやサミットなど日常の買い物に便利",icon:"🛒"},
      {rank:6,name:"用賀神社",category:"ランドマーク",description:"住宅街の中にひっそり佇む地域の神社",icon:"⛩️"},
      {rank:5,name:"桜新町方面散歩",category:"ランドマーク",description:"サザエさんの街・桜新町も徒歩圏内",icon:"🚶"},
      {rank:4,name:"田園都市線の利便性",category:"生活便利",description:"渋谷まで15分、半蔵門線直通で大手町も1本",icon:"🚃"},
      {rank:3,name:"世田谷美術館",category:"文化・アート",description:"砧公園内にある緑に囲まれた美術館",icon:"🎨"},
      {rank:2,name:"砧公園",category:"公園・自然",description:"芝生広場で寝転がる週末が日常になる",icon:"🌿"},
      {rank:1,name:"都心と自然のベストバランス",category:"ランドマーク",description:"渋谷15分なのに、この緑の豊かさは反則",icon:"🌳"},
    ]
  },
  {
    slug:"sasazuka",name:"笹塚",area:"渋谷区",
    station:["笹塚駅"],lines:["京王線","京王新線"],
    catchcopy:"新宿5分、渋谷区の隠れた実力派",
    description:"新宿まで京王線で5分、十号通り商店街を中心に活気がある下町的な渋谷区。幡ヶ谷と並ぶコスパの良さで、若い世代に人気上昇中。",
    vibe:["コスパ","商店街","渋谷区","新宿近い","穴場"],popularity:2,
    avgRent:{oneRoom:"7.5万",oneK:"9.2万",oneLDK:"14.5万"},
    bestFor:["20代一人暮らし","新宿勤務","コスパ重視"],
    commuteMinutes:{"渋谷":10,"新宿":5,"東京":22,"池袋":18,"品川":22},
    spots:[
      {rank:10,name:"笹塚ボウル",category:"ランドマーク",description:"レトロなボウリング場が地元のシンボル",icon:"🎳"},
      {rank:9,name:"フレンテ笹塚",category:"ショッピング",description:"駅直結の商業施設で日常の買い物に便利",icon:"🏬"},
      {rank:8,name:"笹塚の飲み屋",category:"夜の街",description:"駅周辺に個人経営の居酒屋が点在",icon:"🍺"},
      {rank:7,name:"大原の住宅街",category:"ランドマーク",description:"少し歩くと閑静な住宅エリアに",icon:"🏡"},
      {rank:6,name:"玉川上水緑道",category:"公園・自然",description:"歴史ある水路跡が緑道として整備",icon:"🌿"},
      {rank:5,name:"代田橋方面の沖縄タウン",category:"グルメ",description:"隣駅には沖縄料理店が集まるエリアも",icon:"🌺"},
      {rank:4,name:"京王線の利便性",category:"生活便利",description:"新宿5分、都営新宿線直通で都心も楽々",icon:"🚃"},
      {rank:3,name:"渋谷区アドレス",category:"生活便利",description:"渋谷区で7万円台は破格のコスパ",icon:"💰"},
      {rank:2,name:"十号通り商店街",category:"ショッピング",description:"八百屋からカフェまで、生活に必要なものが全部揃う",icon:"🛒"},
      {rank:1,name:"新宿5分の穴場力",category:"ランドマーク",description:"「笹塚？どこそれ」が最高の褒め言葉",icon:"✨"},
    ]
  },
  {
    slug:"nishikoiwa",name:"西小岩",area:"江戸川区",
    station:["小岩駅"],lines:["JR総武線"],
    catchcopy:"東京のディープ下町、圧倒的コスパ",
    description:"再開発が進む小岩駅周辺。昔ながらの飲み屋街と新しい商業施設が共存し、家賃は都内屈指の安さ。秋葉原まで総武線1本、千葉方面へのアクセスも抜群。",
    vibe:["下町","コスパ","飲み屋","再開発","ディープ"],popularity:2,
    avgRent:{oneRoom:"5.5万",oneK:"7.0万",oneLDK:"10.0万"},
    bestFor:["20代一人暮らし","節約派","下町好き"],
    commuteMinutes:{"渋谷":35,"新宿":30,"東京":20,"池袋":35,"品川":32},
    spots:[
      {rank:10,name:"小岩フラワーロード",category:"ショッピング",description:"花屋が多い商店街はちょっとした癒し",icon:"🌷"},
      {rank:9,name:"江戸川河川敷",category:"公園・自然",description:"広大な河川敷でBBQやランニング",icon:"🏃"},
      {rank:8,name:"小岩の銭湯",category:"生活便利",description:"昔ながらの銭湯文化が健在",icon:"♨️"},
      {rank:7,name:"再開発エリア",category:"ランドマーク",description:"駅前再開発でタワマンと商業施設が誕生中",icon:"🏗️"},
      {rank:6,name:"インド・ネパール料理",category:"グルメ",description:"本格的なエスニック料理店が集結",icon:"🍛"},
      {rank:5,name:"地元の中華料理店",category:"グルメ",description:"安くて量が多い町中華が充実",icon:"🥟"},
      {rank:4,name:"都内最安クラスの家賃",category:"生活便利",description:"1Rで5万円台は東京とは思えない安さ",icon:"💰"},
      {rank:3,name:"小岩の飲み屋街",category:"夜の街",description:"昭和の横丁が残るディープな飲み屋エリア",icon:"🏮"},
      {rank:2,name:"総武線の利便性",category:"生活便利",description:"秋葉原20分、東京駅20分の実力",icon:"🚃"},
      {rank:1,name:"圧倒的コストパフォーマンス",category:"ランドマーク",description:"都内で最も安く暮らせる街の一つ",icon:"👑"},
    ]
  },
  {
    slug:"todoroki",name:"等々力",area:"世田谷区",
    station:["等々力駅"],lines:["東急大井町線"],
    catchcopy:"23区唯一の渓谷がある、自然の隠れ里",
    description:"東京23区で唯一の渓谷「等々力渓谷」を擁する世田谷の閑静な住宅街。都心とは思えない自然の豊かさと、穏やかな住環境が魅力。",
    vibe:["自然","渓谷","閑静","世田谷","ヒーリング"],popularity:2,
    avgRent:{oneRoom:"6.8万",oneK:"8.5万",oneLDK:"13.5万"},
    bestFor:["自然好き","ファミリー","静かに暮らしたい人"],
    commuteMinutes:{"渋谷":20,"新宿":30,"東京":38,"池袋":38,"品川":28},
    spots:[
      {rank:10,name:"等々力不動尊",category:"ランドマーク",description:"渓谷の上に佇む歴史ある不動尊",icon:"🙏"},
      {rank:9,name:"閑静な住宅街",category:"ランドマーク",description:"世田谷の高級住宅エリアの穏やかさ",icon:"🏡"},
      {rank:8,name:"等々力駅前の商店",category:"ショッピング",description:"小さいけれど必要な店は揃う",icon:"🛒"},
      {rank:7,name:"多摩川へのアクセス",category:"公園・自然",description:"少し歩けば多摩川の河川敷に出られる",icon:"🌊"},
      {rank:6,name:"OTTO（イタリアン）",category:"グルメ",description:"住宅街に潜む本格イタリアンの名店",icon:"🍝"},
      {rank:5,name:"二子玉川散歩",category:"ランドマーク",description:"大井町線で二子玉川も2駅の近さ",icon:"🚃"},
      {rank:4,name:"日本庭園",category:"公園・自然",description:"渓谷内にある静かな日本庭園",icon:"🌸"},
      {rank:3,name:"野鳥と自然",category:"公園・自然",description:"カワセミも現れる都心の自然の宝庫",icon:"🐦"},
      {rank:2,name:"渓谷散歩",category:"公園・自然",description:"30mの谷底に降りると別世界が広がる",icon:"🌿"},
      {rank:1,name:"等々力渓谷",category:"公園・自然",description:"23区唯一の渓谷、東京にいることを忘れる緑の聖域",icon:"🏞️"},
    ]
  },
  {
    slug:"kinshicho",name:"錦糸町",area:"墨田区",
    station:["錦糸町駅"],lines:["JR総武線","東京メトロ半蔵門線"],
    catchcopy:"下町とアーバンが交差する、東東京の拠点",
    description:"オリナスやパルコなど商業施設が充実しつつ、路地に入れば昭和の飲み屋街が残る二面性が魅力。半蔵門線で大手町や渋谷も1本で行ける、東側の要衝。",
    vibe:["下町","ショッピング","飲み屋","利便性","再開発"],popularity:3,
    avgRent:{oneRoom:"7.5万",oneK:"9.5万",oneLDK:"14.0万"},
    bestFor:["20代一人暮らし","東東京好き","利便性重視"],
    commuteMinutes:{"渋谷":25,"新宿":22,"東京":10,"池袋":25,"品川":25},
    spots:[
      {rank:10,name:"すみだ水族館（スカイツリー内）",category:"ランドマーク",description:"スカイツリーも目と鼻の先",icon:"🐠"},
      {rank:9,name:"錦糸公園",category:"公園・自然",description:"花見スポットとしても人気の広い公園",icon:"🌸"},
      {rank:8,name:"LIVIN錦糸町",category:"ショッピング",description:"西友系の大型ショッピングセンター",icon:"🛒"},
      {rank:7,name:"半蔵門線の利便性",category:"生活便利",description:"大手町・渋谷まで乗り換えなし",icon:"🚃"},
      {rank:6,name:"錦糸町パルコ",category:"ショッピング",description:"2019年オープンの新ランドマーク",icon:"🛍️"},
      {rank:5,name:"オリナス錦糸町",category:"ショッピング",description:"映画館も入る大型商業施設",icon:"🎬"},
      {rank:4,name:"エスニック料理",category:"グルメ",description:"東南アジア料理の本格店が多い",icon:"🍜"},
      {rank:3,name:"錦糸町の飲み屋横丁",category:"夜の街",description:"昭和のディープな横丁がまだ健在",icon:"🏮"},
      {rank:2,name:"総武線・半蔵門線のダブルアクセス",category:"生活便利",description:"JRとメトロ、2路線使える最強の利便性",icon:"🚉"},
      {rank:1,name:"新旧が混ざり合うカオス",category:"ランドマーク",description:"きれいな商業施設とディープ横丁が共存する稀有な街",icon:"✨"},
    ]
  },
  {
    slug:"shin-okachimachi",name:"新御徒町",area:"台東区",
    station:["新御徒町駅"],lines:["都営大江戸線","つくばエクスプレス"],
    catchcopy:"上野・御徒町に歩ける、静かな下町の穴場",
    description:"上野と浅草の間に位置し、両方に徒歩で行ける好立地。佐竹商店街は日本で2番目に古い商店街として知られ、落ち着いた下町の暮らしが待っている。",
    vibe:["下町","穴場","上野近い","浅草近い","商店街"],popularity:1,
    avgRent:{oneRoom:"7.5万",oneK:"9.0万",oneLDK:"13.5万"},
    bestFor:["下町好き","20代一人暮らし","アクセス重視"],
    commuteMinutes:{"渋谷":25,"新宿":18,"東京":10,"池袋":20,"品川":25},
    spots:[
      {rank:10,name:"つくばエクスプレス",category:"生活便利",description:"秋葉原まで1駅、つくば方面へも直通",icon:"🚄"},
      {rank:9,name:"おかず横丁",category:"グルメ",description:"昔ながらの惣菜店が並ぶレトロな横丁",icon:"🍢"},
      {rank:8,name:"鳥越神社",category:"ランドマーク",description:"鳥越祭りで有名な歴史ある神社",icon:"⛩️"},
      {rank:7,name:"御徒町の多慶屋",category:"ショッピング",description:"ディスカウントストアの聖地が徒歩圏",icon:"🏬"},
      {rank:6,name:"アメ横",category:"ショッピング",description:"上野アメヤ横丁も歩いて行ける",icon:"🛍️"},
      {rank:5,name:"上野の美術館群",category:"文化・アート",description:"国立西洋美術館、東京都美術館が散歩圏",icon:"🎨"},
      {rank:4,name:"大江戸線の便利さ",category:"生活便利",description:"都心を環状に巡る大江戸線が使える",icon:"🚃"},
      {rank:3,name:"上野恩賜公園",category:"公園・自然",description:"花見・動物園・博物館が揃う都市公園が徒歩圏",icon:"🌿"},
      {rank:2,name:"佐竹商店街",category:"ショッピング",description:"日本で2番目に古い歴史ある商店街",icon:"🏪"},
      {rank:1,name:"上野・浅草のあいだ暮らし",category:"ランドマーク",description:"二大観光地を徒歩圏に持つ、静かな日常",icon:"🏡"},
    ]
  },
  {
    slug:"nishitokyo-tanashi",name:"田無",area:"西東京市",
    station:["田無駅"],lines:["西武新宿線"],
    catchcopy:"都心を離れて見つけた、ちょうどいい暮らし",
    description:"西武新宿線で新宿から約30分。アスタ（駅ビル）をはじめ商業施設が充実し、日常の買い物に困らない。都内なのに空が広く、のびのび暮らせる。",
    vibe:["コスパ","のびのび","商業施設","ファミリー","郊外"],popularity:1,
    avgRent:{oneRoom:"5.0万",oneK:"6.5万",oneLDK:"9.5万"},
    bestFor:["ファミリー","節約派","郊外派"],
    commuteMinutes:{"渋谷":40,"新宿":30,"東京":45,"池袋":35,"品川":45},
    spots:[
      {rank:10,name:"多摩六都科学館",category:"文化・アート",description:"世界最大級のプラネタリウムがある科学館",icon:"🔭"},
      {rank:9,name:"西東京いこいの森公園",category:"公園・自然",description:"広大な芝生が広がる市民の憩いの場",icon:"🌿"},
      {rank:8,name:"田無神社",category:"ランドマーク",description:"五龍神で知られるパワースポット",icon:"🐉"},
      {rank:7,name:"LIVIN田無",category:"ショッピング",description:"食品から衣料まで揃う大型店",icon:"🛒"},
      {rank:6,name:"田無タワー",category:"ランドマーク",description:"195mのスカイタワー西東京が街のシンボル",icon:"🗼"},
      {rank:5,name:"エンジョイ・スポーツ",category:"公園・自然",description:"スポーツ施設が充実、健康的な暮らし",icon:"⚽"},
      {rank:4,name:"アスタ（駅ビル）",category:"ショッピング",description:"駅直結の商業施設で日常の買い物が完結",icon:"🏬"},
      {rank:3,name:"都内最安レベルの家賃",category:"生活便利",description:"1Rで5万円台、1LDKでも10万円以下",icon:"💰"},
      {rank:2,name:"空の広さ",category:"ランドマーク",description:"高い建物が少なく、空が広い開放感",icon:"🌤️"},
      {rank:1,name:"ちょうどいい郊外",category:"ランドマーク",description:"都心へのアクセスと暮らしやすさの最適バランス",icon:"⚖️"},
    ]
  },
  {
    slug:"kyodo",name:"経堂",area:"世田谷区",
    station:["経堂駅"],lines:["小田急線"],
    catchcopy:"農大通りが紡ぐ、食と学びの街",
    description:"東京農業大学のお膝元で、農大通り商店街は食にこだわる店が多い。経堂コルティ（駅ビル）もでき、利便性も向上。世田谷の穏やかな暮らしが手に入る。",
    vibe:["グルメ","学生街","商店街","世田谷","穏やか"],popularity:2,
    avgRent:{oneRoom:"6.8万",oneK:"8.5万",oneLDK:"13.0万"},
    bestFor:["グルメ好き","20代一人暮らし","世田谷に住みたい人"],
    commuteMinutes:{"渋谷":15,"新宿":13,"東京":28,"池袋":25,"品川":25},
    spots:[
      {rank:10,name:"すずらん通り商店街",category:"ショッピング",description:"地元密着型の小さな商店街",icon:"🌼"},
      {rank:9,name:"世田谷区立図書館",category:"生活便利",description:"充実した蔵書で知的な暮らしをサポート",icon:"📚"},
      {rank:8,name:"東京農業大学「食と農」の博物館",category:"文化・アート",description:"食文化を学べる無料の博物館",icon:"🌾"},
      {rank:7,name:"経堂コルティ",category:"ショッピング",description:"駅直結の商業施設、スーパーも入居",icon:"🏬"},
      {rank:6,name:"小田急線の便利さ",category:"生活便利",description:"新宿まで各停でも13分の好アクセス",icon:"🚃"},
      {rank:5,name:"農大通りの食べ歩き",category:"グルメ",description:"食にこだわる店が多い、学生街ならではの充実度",icon:"🍽️"},
      {rank:4,name:"馬事公苑エリア",category:"公園・自然",description:"馬事公苑の緑が近い贅沢",icon:"🐴"},
      {rank:3,name:"コスパの良い飲食店",category:"グルメ",description:"学生街ゆえに安くて美味しい店が多い",icon:"💰"},
      {rank:2,name:"農大通り商店街",category:"ショッピング",description:"東京農大と共に歩む、食の個性豊かな商店街",icon:"🛒"},
      {rank:1,name:"食への探究心が満たされる街",category:"ランドマーク",description:"農大が育んだ「食」への真剣さが街全体に宿る",icon:"🍳"},
    ]
  },
  {
    slug:"okubo",name:"大久保",area:"新宿区",
    station:["大久保駅","新大久保駅"],lines:["JR中央線","JR山手線"],
    catchcopy:"世界のごはんが集まる、多国籍タウン",
    description:"韓国料理で有名な新大久保を含むエリアだが、実はベトナム、ネパール、ミャンマー料理など世界中のグルメが集結。新宿まで歩けるアクセスの良さも魅力。",
    vibe:["多国籍","グルメ","韓国","エスニック","新宿近い"],popularity:4,
    avgRent:{oneRoom:"7.5万",oneK:"9.0万",oneLDK:"14.0万"},
    bestFor:["グルメ好き","海外文化好き","新宿勤務"],
    commuteMinutes:{"渋谷":10,"新宿":3,"東京":18,"池袋":8,"品川":20},
    spots:[
      {rank:10,name:"ネパール料理店",category:"グルメ",description:"本場のダルバートやモモが楽しめる",icon:"🇳🇵"},
      {rank:9,name:"韓国コスメ・雑貨店",category:"ショッピング",description:"最新の韓国コスメが日本最速で手に入る",icon:"💄"},
      {rank:8,name:"ミャンマー・ベトナム料理",category:"グルメ",description:"東南アジアの本格的な味が集結",icon:"🍜"},
      {rank:7,name:"イスラム横丁",category:"ショッピング",description:"ハラール食材やスパイスが揃うエスニック通り",icon:"🧆"},
      {rank:6,name:"大久保通り",category:"ランドマーク",description:"多国籍レストランが並ぶメインストリート",icon:"🌏"},
      {rank:5,name:"新宿まで徒歩圏",category:"生活便利",description:"歌舞伎町まで歩いて10分の好立地",icon:"🚶"},
      {rank:4,name:"韓国チキン・ホットク",category:"グルメ",description:"行列のできる韓国ストリートフードの名店群",icon:"🍗"},
      {rank:3,name:"多文化共生の空気感",category:"ランドマーク",description:"50以上の国の人々が暮らすダイバーシティ",icon:"🌍"},
      {rank:2,name:"韓国料理タウン",category:"グルメ",description:"サムギョプサル、トッポギ、チーズタッカルビの激戦区",icon:"🇰🇷"},
      {rank:1,name:"世界のごはんが徒歩5分",category:"グルメ",description:"今日は韓国、明日はネパール、世界一周グルメ生活",icon:"🌮"},
    ]
  },
  {
    slug:"toritsukasei",name:"都立家政",area:"中野区",
    station:["都立家政駅"],lines:["西武新宿線"],
    catchcopy:"昭和が残る、中野区の穏やか商店街",
    description:"西武新宿線の各停駅で、駅前に昭和の面影が残る商店街が伸びる。中野区のなかでもひときわ静かで、鷺ノ宮・野方にも歩いて行ける穴場的存在。",
    vibe:["穴場","レトロ","商店街","静か","中野区"],popularity:1,
    avgRent:{oneRoom:"5.8万",oneK:"7.5万",oneLDK:"11.0万"},
    bestFor:["一人暮らしデビュー","節約派","静かに暮らしたい人"],
    commuteMinutes:{"渋谷":25,"新宿":15,"東京":30,"池袋":22,"品川":32},
    spots:[
      {rank:10,name:"鷺宮体育館",category:"生活便利",description:"区民プールやジムが使える複合スポーツ施設",icon:"🏊"},
      {rank:9,name:"野方方面への散歩",category:"ランドマーク",description:"隣の野方商店街まで歩いて食べ歩き",icon:"🚶"},
      {rank:8,name:"昭和レトロな店構え",category:"ランドマーク",description:"看板や外観に昭和の面影が色濃い",icon:"📷"},
      {rank:7,name:"中野区の図書館",category:"生活便利",description:"近隣に図書館があり知的な暮らしに便利",icon:"📚"},
      {rank:6,name:"個人経営の惣菜屋",category:"グルメ",description:"手作りの惣菜やお弁当がワンコイン",icon:"🍱"},
      {rank:5,name:"地元密着の八百屋",category:"ショッピング",description:"スーパーより安い、対面販売の八百屋が健在",icon:"🥬"},
      {rank:4,name:"西武新宿線の穴場",category:"生活便利",description:"新宿まで15分、各停駅ゆえの静かさ",icon:"🚃"},
      {rank:3,name:"都立家政の商店街",category:"ショッピング",description:"生活に必要なものが徒歩圏に揃うコンパクトな商店街",icon:"🛒"},
      {rank:2,name:"圧倒的な家賃の安さ",category:"生活便利",description:"中野区で5万円台から住める驚きのコスパ",icon:"💰"},
      {rank:1,name:"昭和の温もりが残る穴場",category:"ランドマーク",description:"知る人ぞ知る、中野区の隠れた楽園",icon:"🏡"},
    ]
  },
  {
    slug:"komazawa-daigaku",name:"駒沢大学",area:"世田谷区",
    station:["駒沢大学駅"],lines:["東急田園都市線"],
    catchcopy:"公園ランナーが集う、健康的な街",
    description:"駒沢オリンピック公園を中心に、ランニングやスポーツを楽しむ人々が集まる健康的な街。田園都市線で渋谷まで7分、おしゃれなカフェも点在。",
    vibe:["スポーツ","健康","公園","カフェ","おしゃれ"],popularity:3,
    avgRent:{oneRoom:"7.5万",oneK:"9.5万",oneLDK:"14.5万"},
    bestFor:["スポーツ好き","健康志向","20代〜30代"],
    commuteMinutes:{"渋谷":7,"新宿":18,"東京":28,"池袋":25,"品川":20},
    spots:[
      {rank:10,name:"駒沢大学",category:"ランドマーク",description:"学生の活気が街に生命力を与える",icon:"🎓"},
      {rank:9,name:"駒沢通りのカフェ",category:"カフェ",description:"ランニング後に寄りたいおしゃれカフェが点在",icon:"☕"},
      {rank:8,name:"Mr.FARMER",category:"カフェ",description:"健康志向のサラダボウルが人気のカフェ",icon:"🥗"},
      {rank:7,name:"世田谷公園",category:"公園・自然",description:"駒沢公園の他にも緑が豊富",icon:"🌿"},
      {rank:6,name:"田園都市線の便利さ",category:"生活便利",description:"渋谷まで7分、半蔵門線直通で大手町へ",icon:"🚃"},
      {rank:5,name:"駒沢公園の週末マルシェ",category:"イベント",description:"定期的に開催されるファーマーズマーケット",icon:"🧑‍🌾"},
      {rank:4,name:"トレーニングジム",category:"生活便利",description:"公園周辺にフィットネス施設が充実",icon:"💪"},
      {rank:3,name:"ランニングカルチャー",category:"ランドマーク",description:"朝から走る人々が街のアイデンティティ",icon:"🏃"},
      {rank:2,name:"駒沢オリンピック公園",category:"公園・自然",description:"ランニング・サイクリング・スポーツの聖地",icon:"🌳"},
      {rank:1,name:"走って、食べて、整う日常",category:"ランドマーク",description:"運動と食とカフェが一体化した、健康的な暮らし",icon:"✨"},
    ]
  },
  {
    slug:"tsukishima",name:"月島",area:"中央区",
    station:["月島駅"],lines:["東京メトロ有楽町線","都営大江戸線"],
    catchcopy:"もんじゃの匂いと、タワマンの風",
    description:"もんじゃストリートで有名な下町情緒と、近年のタワーマンション開発が共存する不思議な街。銀座まで1駅、豊洲にも近く、東京の中心に住む実感が得られる。",
    vibe:["もんじゃ","下町","タワマン","銀座近い","ウォーターフロント"],popularity:3,
    avgRent:{oneRoom:"9.0万",oneK:"11.0万",oneLDK:"16.5万"},
    bestFor:["都心暮らし","カップル","グルメ好き"],
    commuteMinutes:{"渋谷":22,"新宿":22,"東京":8,"池袋":22,"品川":18},
    spots:[
      {rank:10,name:"豊洲市場",category:"グルメ",description:"築地の後継、新鮮な海鮮が徒歩圏",icon:"🐟"},
      {rank:9,name:"隅田川テラス",category:"公園・自然",description:"川沿いの遊歩道はランニング・散歩に最適",icon:"🏃"},
      {rank:8,name:"佃煮の老舗",category:"グルメ",description:"佃島の伝統的な佃煮屋が今も営業",icon:"🍶"},
      {rank:7,name:"タワーマンションの眺望",category:"ランドマーク",description:"高層階からの東京湾の眺めは絶景",icon:"🏙️"},
      {rank:6,name:"銀座まで1駅",category:"生活便利",description:"有楽町線で銀座一丁目まで1駅の贅沢",icon:"🚃"},
      {rank:5,name:"佃大橋からの夜景",category:"ランドマーク",description:"隅田川越しの東京の夜景が美しい",icon:"🌃"},
      {rank:4,name:"有楽町線・大江戸線のダブルアクセス",category:"生活便利",description:"2路線使えるアクセスの良さ",icon:"🚉"},
      {rank:3,name:"西仲通り商店街",category:"ショッピング",description:"昔ながらの商店街にもんじゃ屋が並ぶ",icon:"🛒"},
      {rank:2,name:"下町とタワマンの共存",category:"ランドマーク",description:"路地裏の人情とタワマンの利便性が同居する稀有な光景",icon:"🏘️"},
      {rank:1,name:"もんじゃストリート",category:"グルメ",description:"70店以上のもんじゃ焼き店がひしめく日本一の激戦区",icon:"🥘"},
    ]
  },
  {
    slug:"koenji-minami",name:"東高円寺",area:"杉並区",
    station:["東高円寺駅"],lines:["東京メトロ丸ノ内線"],
    catchcopy:"高円寺のカルチャーを、もう少し静かに",
    description:"高円寺の隣だが丸ノ内線沿いで新宿へ直通。高円寺のカルチャーを享受しつつ、少し落ち着いた住環境が手に入る。蚕糸の森公園も癒し。",
    vibe:["穴場","カルチャー","丸ノ内線","静か","高円寺隣"],popularity:1,
    avgRent:{oneRoom:"6.5万",oneK:"8.0万",oneLDK:"12.5万"},
    bestFor:["20代一人暮らし","カルチャー好き","コスパ重視"],
    commuteMinutes:{"渋谷":18,"新宿":8,"東京":22,"池袋":15,"品川":28},
    spots:[
      {rank:10,name:"杉並区役所",category:"生活便利",description:"区役所が近いのは実は結構便利",icon:"🏛️"},
      {rank:9,name:"高円寺への散歩",category:"ランドマーク",description:"高円寺まで歩いて古着屋・ライブハウス巡り",icon:"🚶"},
      {rank:8,name:"大久保通りの飲食店",category:"グルメ",description:"安くて美味しい個人店が通り沿いに",icon:"🍽️"},
      {rank:7,name:"環七沿いのラーメン",category:"グルメ",description:"環七ラーメン戦争の名残、名店が残る",icon:"🍜"},
      {rank:6,name:"和田堀公園方面",category:"公園・自然",description:"善福寺川沿いの緑地帯へ散歩",icon:"🌿"},
      {rank:5,name:"丸ノ内線の安心感",category:"生活便利",description:"新宿・東京・銀座に乗り換えなしでアクセス",icon:"🚃"},
      {rank:4,name:"個性派カフェ",category:"カフェ",description:"高円寺文化圏のカフェが東高円寺にも点在",icon:"☕"},
      {rank:3,name:"家賃の安さ",category:"生活便利",description:"高円寺より安い、杉並区の穴場価格",icon:"💰"},
      {rank:2,name:"蚕糸の森公園",category:"公園・自然",description:"旧蚕糸試験場跡地の美しい公園",icon:"🌳"},
      {rank:1,name:"高円寺の隣で、ちょうどいい静けさ",category:"ランドマーク",description:"カルチャーの恩恵を受けつつ、静かに暮らす",icon:"😌"},
    ]
  },
  {
    slug:"otsuka",name:"大塚",area:"豊島区",
    station:["大塚駅"],lines:["JR山手線","都電荒川線"],
    catchcopy:"山手線なのに、どこか懐かしい穴場駅",
    description:"山手線の駅でありながら再開発から取り残された感が逆に魅力。都電荒川線が走るレトロな風景と、駅前のバラに彩られた散歩道。池袋まで1駅の利便性と下町感の共存。",
    vibe:["山手線","穴場","レトロ","都電","バラ"],popularity:2,
    avgRent:{oneRoom:"7.5万",oneK:"9.0万",oneLDK:"13.5万"},
    bestFor:["池袋勤務","レトロ好き","コスパ重視"],
    commuteMinutes:{"渋谷":15,"新宿":10,"東京":15,"池袋":3,"品川":20},
    spots:[
      {rank:10,name:"大塚のバラ祭り",category:"イベント",description:"駅前のバラが満開になる5月のイベント",icon:"🌹"},
      {rank:9,name:"天祖神社",category:"ランドマーク",description:"巣鴨と大塚の間に佇む由緒ある神社",icon:"⛩️"},
      {rank:8,name:"大塚の居酒屋横丁",category:"夜の街",description:"駅南口にディープな飲み屋が集結",icon:"🏮"},
      {rank:7,name:"巣鴨への散歩",category:"ランドマーク",description:"おばあちゃんの原宿こと巣鴨も隣駅",icon:"🚶"},
      {rank:6,name:"南大塚の住宅街",category:"ランドマーク",description:"静かな住宅エリアが広がる",icon:"🏡"},
      {rank:5,name:"山手線の利便性",category:"生活便利",description:"池袋1駅、新宿10分、東京15分",icon:"🚃"},
      {rank:4,name:"都電荒川線",category:"ランドマーク",description:"東京に残る唯一の路面電車が目の前",icon:"🚋"},
      {rank:3,name:"山手線で最も地味な駅",category:"ランドマーク",description:"その地味さが最大の武器、家賃がお手頃",icon:"💰"},
      {rank:2,name:"大塚駅前のバラロード",category:"公園・自然",description:"700株のバラが彩る駅前の遊歩道",icon:"🌷"},
      {rank:1,name:"山手線の穴場という贅沢",category:"ランドマーク",description:"池袋1駅なのに人に自慢しない、そんな奥ゆかしさ",icon:"✨"},
    ]
  },
  // ===== ここから追加50街 (51-100) =====
  {slug:"kameido",name:"亀戸",area:"江東区",station:["亀戸駅"],lines:["JR総武線","東武亀戸線"],catchcopy:"天神さまと餃子の、下町パワータウン",description:"亀戸天神の藤棚と餃子激戦区で知られる、東東京の活気ある下町。錦糸町の隣で利便性も高く、再開発も進行中。",vibe:["下町","餃子","天神","再開発","活気"],popularity:3,avgRent:{oneRoom:"7.0万",oneK:"8.5万",oneLDK:"13.0万"},bestFor:["下町好き","グルメ好き","東東京派"],commuteMinutes:{"渋谷":28,"新宿":25,"東京":15,"池袋":28,"品川":28},spots:[{rank:10,name:"亀戸中央公園",category:"公園・自然",description:"広い芝生でのんびり過ごせる",icon:"🌿"},{rank:9,name:"東武亀戸線",category:"生活便利",description:"レトロな2両編成のローカル線",icon:"🚃"},{rank:8,name:"亀戸梅屋敷",category:"ランドマーク",description:"江東区の観光案内やイベントスペース",icon:"🏠"},{rank:7,name:"船橋屋のくず餅",category:"グルメ",description:"創業1805年の老舗くず餅",icon:"🍡"},{rank:6,name:"亀戸ホルモン",category:"グルメ",description:"行列必至のホルモン焼き名店",icon:"🥩"},{rank:5,name:"亀戸の藤まつり",category:"イベント",description:"亀戸天神の藤棚は圧巻の美しさ",icon:"💜"},{rank:4,name:"駅前再開発",category:"ランドマーク",description:"大型商業施設の建設が進む期待エリア",icon:"🏗️"},{rank:3,name:"亀戸天神社",category:"ランドマーク",description:"学問の神様、藤の名所",icon:"⛩️"},{rank:2,name:"亀戸餃子",category:"グルメ",description:"1皿250円、皿が積み上がる名物餃子",icon:"🥟"},{rank:1,name:"下町のエネルギー",category:"ランドマーク",description:"食べて飲んで参拝して、元気をもらう街",icon:"💪"}]},
  {slug:"machiya",name:"町屋",area:"荒川区",station:["町屋駅"],lines:["東京メトロ千代田線","都電荒川線","京成本線"],catchcopy:"3路線使える、荒川区の穴場ハブ",description:"千代田線・京成線・都電荒川線の3路線が使えるアクセス抜群の穴場。駅前は昔ながらの商店街で、家賃は都心に比べてかなり手頃。",vibe:["穴場","コスパ","3路線","下町","都電"],popularity:1,avgRent:{oneRoom:"6.5万",oneK:"8.0万",oneLDK:"12.0万"},bestFor:["コスパ重視","都心勤務","下町好き"],commuteMinutes:{"渋谷":28,"新宿":25,"東京":18,"池袋":22,"品川":28},spots:[{rank:10,name:"荒川自然公園",category:"公園・自然",description:"プールもある区民の憩いの場",icon:"🌿"},{rank:9,name:"荒川遊園（近隣）",category:"ランドマーク",description:"日本一安い遊園地が近い",icon:"🎡"},{rank:8,name:"都電荒川線",category:"ランドマーク",description:"レトロな路面電車で街巡り",icon:"🚋"},{rank:7,name:"町屋斎場前のバラ園",category:"公園・自然",description:"バラが美しい隠れたスポット",icon:"🌹"},{rank:6,name:"尾竹橋通りの商店街",category:"ショッピング",description:"昔ながらの個人商店が並ぶ",icon:"🛒"},{rank:5,name:"京成線で成田空港へ",category:"生活便利",description:"成田空港へ乗り換えなしのアクセス",icon:"✈️"},{rank:4,name:"千代田線の利便性",category:"生活便利",description:"大手町・表参道まで乗り換えなし",icon:"🚃"},{rank:3,name:"3路線使える",category:"生活便利",description:"千代田線・京成・都電の3路線が使える贅沢",icon:"🚉"},{rank:2,name:"家賃の安さ",category:"生活便利",description:"千代田線沿線で6万円台は破格",icon:"💰"},{rank:1,name:"知られていないことが武器",category:"ランドマーク",description:"3路線使えてこの家賃、教えたくない穴場",icon:"🤫"}]},
  {slug:"shin-maruko",name:"新丸子",area:"川崎市中原区",station:["新丸子駅"],lines:["東急東横線"],catchcopy:"武蔵小杉の隣、知る人ぞ知る東横線の穴場",description:"武蔵小杉の隣駅で東横線が使えるのに、駅前は個人商店が並ぶのんびりした雰囲気。多摩川も近く、穴場好きにはたまらない。",vibe:["穴場","東横線","多摩川","商店街","のんびり"],popularity:1,avgRent:{oneRoom:"6.5万",oneK:"8.0万",oneLDK:"12.0万"},bestFor:["穴場好き","多摩川沿い暮らし","コスパ重視"],commuteMinutes:{"渋谷":18,"新宿":28,"東京":30,"池袋":32,"品川":22},spots:[{rank:10,name:"丸子山王日枝神社",category:"ランドマーク",description:"地域の氏神様",icon:"⛩️"},{rank:9,name:"新丸子の銭湯",category:"生活便利",description:"昔ながらの銭湯が残る",icon:"♨️"},{rank:8,name:"武蔵小杉の商業施設",category:"ショッピング",description:"グランツリー等が徒歩圏内",icon:"🛍️"},{rank:7,name:"個人経営のカフェ",category:"カフェ",description:"こだわりのコーヒースタンドが点在",icon:"☕"},{rank:6,name:"丸子橋",category:"ランドマーク",description:"多摩川を渡る橋からの景色が美しい",icon:"🌉"},{rank:5,name:"武蔵小杉へ徒歩5分",category:"生活便利",description:"隣駅の大型商業施設が徒歩圏",icon:"🚶"},{rank:4,name:"東横線の便利さ",category:"生活便利",description:"渋谷まで18分、副都心線直通で池袋も",icon:"🚃"},{rank:3,name:"多摩川河川敷",category:"公園・自然",description:"ランニング・BBQ・花火大会の特等席",icon:"🏃"},{rank:2,name:"新丸子の商店街",category:"ショッピング",description:"個人商店が並ぶ温かみのある通り",icon:"🛒"},{rank:1,name:"武蔵小杉の隣で、この穴場感",category:"ランドマーク",description:"大型再開発の隣で静かに暮らす贅沢",icon:"😌"}]},
  {slug:"shakujiikoen",name:"石神井公園",area:"練馬区",station:["石神井公園駅"],lines:["西武池袋線"],catchcopy:"池袋直通、水と緑の練馬暮らし",description:"石神井公園の三宝寺池・石神井池を擁する水と緑の街。池袋まで急行15分で、自然豊かな暮らしと都心アクセスを両立。",vibe:["自然","池","ファミリー","池袋近い","練馬区"],popularity:2,avgRent:{oneRoom:"5.8万",oneK:"7.5万",oneLDK:"11.5万"},bestFor:["ファミリー","自然好き","池袋勤務"],commuteMinutes:{"渋谷":28,"新宿":25,"東京":35,"池袋":15,"品川":35},spots:[{rank:10,name:"石神井プール",category:"生活便利",description:"夏は区営プールで涼む",icon:"🏊"},{rank:9,name:"石神井公園駅の商業施設",category:"ショッピング",description:"駅ナカ・駅前が充実",icon:"🏬"},{rank:8,name:"練馬区の子育て支援",category:"生活便利",description:"子育て世帯への手厚いサポート",icon:"👶"},{rank:7,name:"ボート池",category:"公園・自然",description:"石神井池でボートに乗る週末",icon:"🚣"},{rank:6,name:"三宝寺池の野鳥",category:"公園・自然",description:"カワセミが来る都内屈指の野鳥観察スポット",icon:"🐦"},{rank:5,name:"池袋急行15分",category:"生活便利",description:"西武池袋線急行で池袋直通15分",icon:"🚃"},{rank:4,name:"武蔵関公園",category:"公園・自然",description:"富士見池のある静かな公園も近い",icon:"🌿"},{rank:3,name:"練馬の空の広さ",category:"ランドマーク",description:"高い建物が少なく、空が広い",icon:"🌤️"},{rank:2,name:"石神井公園の四季",category:"公園・自然",description:"桜・新緑・紅葉・雪景色、四季折々の美しさ",icon:"🍁"},{rank:1,name:"東京の湖畔暮らし",category:"公園・自然",description:"池のほとりに住む、都内とは思えない贅沢な日常",icon:"🌳"}]},
  {slug:"sengoku",name:"千石",area:"文京区",station:["千石駅"],lines:["都営三田線"],catchcopy:"六義園を庭にする、文京区の隠れ家",description:"六義園の最寄り駅のひとつで、巣鴨にも近い文京区の閑静な住宅街。治安の良さと教育環境は文京区ならでは。",vibe:["閑静","文教","六義園","治安","穴場"],popularity:1,avgRent:{oneRoom:"7.0万",oneK:"8.8万",oneLDK:"13.5万"},bestFor:["ファミリー","静かに暮らしたい人","文京区志向"],commuteMinutes:{"渋谷":22,"新宿":18,"東京":15,"池袋":8,"品川":25},spots:[{rank:10,name:"文京グリーンコート",category:"ショッピング",description:"スーパーや飲食店が入る便利な複合施設",icon:"🏬"},{rank:9,name:"大和郷（やまとむら）",category:"ランドマーク",description:"都内屈指の高級住宅街が隣接",icon:"🏡"},{rank:8,name:"千石の坂道",category:"ランドマーク",description:"文京区らしい趣のある坂道が多い",icon:"🚶"},{rank:7,name:"巣鴨への散歩",category:"ランドマーク",description:"おばあちゃんの原宿へ気軽に散歩",icon:"🍡"},{rank:6,name:"文京区の治安",category:"生活便利",description:"東京屈指の治安の良さ",icon:"🛡️"},{rank:5,name:"不忍通り沿いの飲食店",category:"グルメ",description:"和食からカフェまで、堅実な食の選択肢",icon:"🍽️"},{rank:4,name:"三田線の利便性",category:"生活便利",description:"大手町・日比谷方面にダイレクトアクセス",icon:"🚃"},{rank:3,name:"六義園の紅葉",category:"公園・自然",description:"11月のライトアップは圧巻の美しさ",icon:"🍁"},{rank:2,name:"六義園",category:"公園・自然",description:"柳沢吉保が造った名園が庭のような距離",icon:"🌸"},{rank:1,name:"文京区の穏やかな日常",category:"ランドマーク",description:"六義園を散歩して帰る、品のある毎日",icon:"✨"}]},
  {slug:"nishi-shinjuku-gochome",name:"西新宿五丁目",area:"新宿区",station:["西新宿五丁目駅"],lines:["都営大江戸線"],catchcopy:"新宿徒歩圏の、意外な住宅街",description:"新宿副都心のすぐ裏に広がる住宅街。神田川沿いは静かで、新宿まで歩ける利便性と落ち着いた暮らしが両立する不思議なエリア。",vibe:["新宿近い","住宅街","穴場","大江戸線","神田川"],popularity:1,avgRent:{oneRoom:"8.0万",oneK:"10.0万",oneLDK:"15.0万"},bestFor:["新宿勤務","都心暮らし","30代カップル"],commuteMinutes:{"渋谷":12,"新宿":5,"東京":20,"池袋":12,"品川":22},spots:[{rank:10,name:"新宿中央公園",category:"公園・自然",description:"都庁の隣にある広大な都市公園",icon:"🌿"},{rank:9,name:"神田川遊歩道",category:"公園・自然",description:"川沿いの静かな散歩道",icon:"🚶"},{rank:8,name:"十二社熊野神社",category:"ランドマーク",description:"新宿総鎮守の歴史ある神社",icon:"⛩️"},{rank:7,name:"西新宿のグルメ",category:"グルメ",description:"ビジネス街ゆえにランチ激戦区",icon:"🍽️"},{rank:6,name:"新宿副都心の夜景",category:"ランドマーク",description:"高層ビル群の夜景が日常の風景に",icon:"🌃"},{rank:5,name:"大江戸線の環状アクセス",category:"生活便利",description:"六本木・汐留・両国…都内を環状に巡れる",icon:"🚃"},{rank:4,name:"新宿まで徒歩",category:"生活便利",description:"西口まで歩いて10分程度",icon:"🚶"},{rank:3,name:"思いの外静かな住環境",category:"ランドマーク",description:"新宿の喧騒から一歩入った静けさ",icon:"😌"},{rank:2,name:"東京都庁展望台",category:"ランドマーク",description:"無料で45階の展望台が楽しめる散歩コース",icon:"🏙️"},{rank:1,name:"新宿の裏庭暮らし",category:"ランドマーク",description:"歌舞伎町と同じ区なのに、この静けさ",icon:"✨"}]},
  {slug:"myogadani",name:"茗荷谷",area:"文京区",station:["茗荷谷駅"],lines:["東京メトロ丸ノ内線"],catchcopy:"名門校ひしめく、文京区の教育タウン",description:"お茶の水女子大、跡見女子大、筑波大附属など名門校が集中する文教の聖地。丸ノ内線で池袋2駅、治安も教育環境も最高レベル。",vibe:["文教","名門校","治安","丸ノ内線","品格"],popularity:2,avgRent:{oneRoom:"7.8万",oneK:"9.5万",oneLDK:"14.5万"},bestFor:["ファミリー","教育重視","治安重視"],commuteMinutes:{"渋谷":18,"新宿":15,"東京":12,"池袋":5,"品川":22},spots:[{rank:10,name:"跡見学園の桜",category:"公園・自然",description:"春の桜並木が美しい",icon:"🌸"},{rank:9,name:"大塚窪町公園",category:"公園・自然",description:"遊具が充実した子供に人気の公園",icon:"🏞️"},{rank:8,name:"茗荷谷の坂道",category:"ランドマーク",description:"播磨坂、湯立坂など趣のある坂が多い",icon:"🚶"},{rank:7,name:"お茶の水女子大学",category:"ランドマーク",description:"名門大学が街の品格を高める",icon:"🎓"},{rank:6,name:"小石川図書館",category:"生活便利",description:"充実した蔵書と静かな環境",icon:"📚"},{rank:5,name:"丸ノ内線の利便性",category:"生活便利",description:"池袋2駅、東京駅まで12分",icon:"🚃"},{rank:4,name:"播磨坂さくら並木",category:"公園・自然",description:"約130本の桜が咲く坂道は都内屈指の花見スポット",icon:"🌸"},{rank:3,name:"教育施設の集中",category:"生活便利",description:"名門校がひしめく文教地区",icon:"📖"},{rank:2,name:"文京区の治安",category:"生活便利",description:"東京屈指の治安の良さ",icon:"🛡️"},{rank:1,name:"教育と品格の街",category:"ランドマーク",description:"子育て世帯が憧れる、文京区の教育特区",icon:"✨"}]},
  {slug:"nakai",name:"中井",area:"新宿区",station:["中井駅"],lines:["西武新宿線","都営大江戸線"],catchcopy:"染め物と坂の、新宿区の隠れ里",description:"落合・中井は染め物の街として知られ、妙正寺川沿いにのれんが飾られる。新宿区でありながら閑静で、2路線使える穴場。",vibe:["穴場","染め物","新宿区","坂","静か"],popularity:1,avgRent:{oneRoom:"6.8万",oneK:"8.5万",oneLDK:"13.0万"},bestFor:["穴場好き","静かに暮らしたい人","アート好き"],commuteMinutes:{"渋谷":18,"新宿":8,"東京":25,"池袋":12,"品川":25},spots:[{rank:10,name:"林芙美子記念館",category:"文化・アート",description:"「放浪記」の作家の旧居が記念館に",icon:"📚"},{rank:9,name:"妙正寺川の遊歩道",category:"公園・自然",description:"川沿いの静かな散歩道",icon:"🚶"},{rank:8,name:"中井のベーカリー",category:"グルメ",description:"住宅街に隠れた名パン屋",icon:"🍞"},{rank:7,name:"2路線使える",category:"生活便利",description:"西武新宿線と大江戸線の2路線",icon:"🚉"},{rank:6,name:"目白方面の散歩",category:"ランドマーク",description:"目白の閑静な住宅街まで歩ける",icon:"🚶"},{rank:5,name:"新宿区の穴場価格",category:"生活便利",description:"新宿区で7万円台は驚き",icon:"💰"},{rank:4,name:"おとめ山公園",category:"公園・自然",description:"湧水が流れる都会のオアシス",icon:"💧"},{rank:3,name:"落合・中井の坂道",category:"ランドマーク",description:"趣のある坂道が多い住宅街",icon:"🏔️"},{rank:2,name:"染の小道",category:"イベント",description:"妙正寺川沿いに反物が飾られる美しいイベント",icon:"🎨"},{rank:1,name:"染め物文化が息づく隠れ里",category:"ランドマーク",description:"新宿区にこんな静かな場所があったとは",icon:"✨"}]},
  {slug:"kiyose",name:"清瀬",area:"清瀬市",station:["清瀬駅"],lines:["西武池袋線"],catchcopy:"ひまわり畑と緑溢れる、東京の田園暮らし",description:"夏のひまわり畑で有名な清瀬。都心からは少し離れるが、その分自然が豊かで空が広い。池袋まで西武池袋線で約30分。",vibe:["自然","ひまわり","郊外","のびのび","コスパ"],popularity:1,avgRent:{oneRoom:"4.5万",oneK:"6.0万",oneLDK:"8.5万"},bestFor:["自然好き","ファミリー","節約派"],commuteMinutes:{"渋谷":42,"新宿":38,"東京":50,"池袋":30,"品川":48},spots:[{rank:10,name:"清瀬金山緑地公園",category:"公園・自然",description:"武蔵野の面影残る緑地",icon:"🌿"},{rank:9,name:"空堀川沿い散歩",category:"公園・自然",description:"川沿いの遊歩道でのんびり散歩",icon:"🚶"},{rank:8,name:"清瀬駅前の商業施設",category:"ショッピング",description:"日常の買い物は駅前で完結",icon:"🛒"},{rank:7,name:"都内最安クラスの家賃",category:"生活便利",description:"1Rで4万円台、ファミリーでも10万以下",icon:"💰"},{rank:6,name:"清瀬中央公園",category:"公園・自然",description:"子供向け遊具が充実した地域の公園",icon:"🏞️"},{rank:5,name:"農産物直売所",category:"グルメ",description:"地元農家の新鮮な野菜が買える",icon:"🥬"},{rank:4,name:"池袋30分",category:"生活便利",description:"西武池袋線で池袋まで約30分",icon:"🚃"},{rank:3,name:"広い空と星空",category:"ランドマーク",description:"都心より星がきれいに見える夜空",icon:"⭐"},{rank:2,name:"清瀬ひまわりフェスティバル",category:"イベント",description:"10万本のひまわりが咲く圧巻の畑",icon:"🌻"},{rank:1,name:"東京で田園暮らし",category:"ランドマーク",description:"東京都とは思えない、のどかな風景の中で暮らす",icon:"🏡"}]},
  {slug:"asagaya",name:"阿佐ヶ谷",area:"杉並区",station:["阿佐ケ谷駅"],lines:["JR中央線"],catchcopy:"文士の街で、穏やかに酔う",description:"太宰治や井伏鱒二が愛した文士の街。パールセンター商店街はアーケード付きで雨の日も快適。七夕まつりは杉並区最大のイベント。",vibe:["文士","商店街","中央線","七夕","穏やか"],popularity:3,avgRent:{oneRoom:"6.8万",oneK:"8.5万",oneLDK:"13.0万"},bestFor:["読書好き","中央線沿線好き","30代一人暮らし"],commuteMinutes:{"渋谷":18,"新宿":10,"東京":22,"池袋":18,"品川":28},spots:[{rank:10,name:"阿佐谷ジャズストリート",category:"イベント",description:"街中がジャズに包まれる年に一度のフェス",icon:"🎷"},{rank:9,name:"神明宮",category:"ランドマーク",description:"杉並区最古の神社",icon:"⛩️"},{rank:8,name:"古書店・個人書店",category:"ショッピング",description:"文士の街ならではの個性的な書店群",icon:"📚"},{rank:7,name:"阿佐ヶ谷の居酒屋",category:"夜の街",description:"路地裏に潜む名居酒屋が多い",icon:"🍶"},{rank:6,name:"スターロード",category:"ショッピング",description:"駅北口の飲食店街、昼も夜も賑わう",icon:"⭐"},{rank:5,name:"中央線の利便性",category:"生活便利",description:"新宿10分、東京22分の好アクセス",icon:"🚃"},{rank:4,name:"河北総合病院",category:"生活便利",description:"大きな病院が近い安心感",icon:"🏥"},{rank:3,name:"七夕まつり",category:"イベント",description:"パールセンター全体が飾り付けられる杉並最大の祭り",icon:"🎋"},{rank:2,name:"パールセンター商店街",category:"ショッピング",description:"アーケード付き約700mの充実した商店街",icon:"🛒"},{rank:1,name:"文士の街の穏やかな空気",category:"ランドマーク",description:"中央線の気取らない文化人の空気感",icon:"📖"}]},
  {slug:"hibarigaoka",name:"ひばりヶ丘",area:"西東京市",station:["ひばりヶ丘駅"],lines:["西武池袋線"],catchcopy:"団地リノベの先駆け、緑豊かな郊外暮らし",description:"URひばりが丘パークヒルズの団地リノベーションで注目を集める街。池袋まで急行20分、緑が多くファミリーに人気。",vibe:["団地リノベ","緑","ファミリー","郊外","コスパ"],popularity:1,avgRent:{oneRoom:"4.8万",oneK:"6.5万",oneLDK:"9.5万"},bestFor:["ファミリー","団地暮らし","コスパ重視"],commuteMinutes:{"渋谷":35,"新宿":30,"東京":42,"池袋":20,"品川":40},spots:[{rank:10,name:"ひばりテラス118",category:"ショッピング",description:"駅前の商業施設で日常の買い物に",icon:"🏬"},{rank:9,name:"栗原公園",category:"公園・自然",description:"子供が遊べる広い公園",icon:"🌿"},{rank:8,name:"西東京の農産物",category:"グルメ",description:"地元の新鮮野菜が手に入る",icon:"🥬"},{rank:7,name:"池袋急行20分",category:"生活便利",description:"西武池袋線急行で都心にアクセス",icon:"🚃"},{rank:6,name:"ひばりが丘の並木道",category:"公園・自然",description:"けやき並木が美しい住宅街",icon:"🌳"},{rank:5,name:"団地カフェ",category:"カフェ",description:"リノベーション団地内のコミュニティカフェ",icon:"☕"},{rank:4,name:"家賃の安さ",category:"生活便利",description:"1Rで5万円以下も可能な価格帯",icon:"💰"},{rank:3,name:"子育て環境",category:"生活便利",description:"公園・学校・病院が揃う安心環境",icon:"👶"},{rank:2,name:"ひばりが丘パークヒルズ",category:"ランドマーク",description:"団地リノベの先駆け、新しい暮らし方の提案",icon:"🏘️"},{rank:1,name:"郊外暮らしの新しいかたち",category:"ランドマーク",description:"リノベ団地×緑×コスパ、これからの住まい方",icon:"✨"}]},
  {slug:"tateishi",name:"立石",area:"葛飾区",station:["京成立石駅"],lines:["京成押上線"],catchcopy:"昼飲みの聖地、下町酒場のテーマパーク",description:"「せんべろの聖地」として全国から酒好きが集まる立石。呑んべ横丁をはじめ、昼から開いている酒場が多数。再開発が進む前の今を楽しみたい。",vibe:["昼飲み","せんべろ","下町","横丁","レトロ"],popularity:3,avgRent:{oneRoom:"5.5万",oneK:"7.0万",oneLDK:"10.5万"},bestFor:["酒好き","下町好き","コスパ重視"],commuteMinutes:{"渋谷":35,"新宿":30,"東京":25,"池袋":32,"品川":30},spots:[{rank:10,name:"立石の銭湯",category:"生活便利",description:"飲んだ後の銭湯は最高の贅沢",icon:"♨️"},{rank:9,name:"タカラ湯",category:"生活便利",description:"レトロな銭湯で飲み歩きの締めに",icon:"🛁"},{rank:8,name:"栄寿司",category:"グルメ",description:"立石の名物寿司店、昼から賑わう",icon:"🍣"},{rank:7,name:"宇ち多゛",category:"グルメ",description:"モツ焼きの名店、朝から行列",icon:"🥩"},{rank:6,name:"再開発前の今",category:"ランドマーク",description:"昭和の横丁が消える前に訪れたい",icon:"⏳"},{rank:5,name:"立石の家賃",category:"生活便利",description:"葛飾区で5万円台から住める",icon:"💰"},{rank:4,name:"京成線で都心へ",category:"生活便利",description:"押上経由で都心にアクセス",icon:"🚃"},{rank:3,name:"立石仲見世商店街",category:"ショッピング",description:"昔ながらの対面商店が残る活気ある商店街",icon:"🛒"},{rank:2,name:"昼飲み文化",category:"夜の街",description:"昼12時から飲める酒場が多数、休日の楽園",icon:"🍺"},{rank:1,name:"呑んべ横丁",category:"夜の街",description:"戦後から続く横丁、せんべろの聖地",icon:"🏮"}]},
  {slug:"ogikubo",name:"荻窪",area:"杉並区",station:["荻窪駅"],lines:["JR中央線","東京メトロ丸ノ内線"],catchcopy:"ラーメンと音楽と、中央線の落ち着き",description:"荻窪ラーメンの発祥地であり、クラシック喫茶が点在する文化的な街。中央線と丸ノ内線の2路線が使え、杉並区の中心的存在。",vibe:["ラーメン","クラシック","中央線","2路線","落ち着き"],popularity:3,avgRent:{oneRoom:"6.8万",oneK:"8.5万",oneLDK:"13.5万"},bestFor:["ラーメン好き","中央線好き","30代"],commuteMinutes:{"渋谷":18,"新宿":12,"東京":25,"池袋":20,"品川":28},spots:[{rank:10,name:"荻窪タウンセブン",category:"ショッピング",description:"駅直結の商業施設、ルミネの食品館も",icon:"🏬"},{rank:9,name:"大田黒公園",category:"公園・自然",description:"音楽評論家の邸宅跡の美しい日本庭園",icon:"🌸"},{rank:8,name:"クラシック喫茶ミニヨン",category:"カフェ",description:"荻窪のクラシック喫茶文化の代表格",icon:"🎵"},{rank:7,name:"読書の森公園",category:"公園・自然",description:"本をテーマにした公園",icon:"📚"},{rank:6,name:"荻窪の魚屋",category:"グルメ",description:"鮮魚店が多く、自炊派に嬉しい環境",icon:"🐟"},{rank:5,name:"教会通り商店街",category:"ショッピング",description:"個性的な個人店が並ぶ趣のある通り",icon:"🛒"},{rank:4,name:"中央線×丸ノ内線",category:"生活便利",description:"2路線使える杉並区の交通ハブ",icon:"🚉"},{rank:3,name:"荻窪白山神社",category:"ランドマーク",description:"荻窪の鎮守、静かな境内",icon:"⛩️"},{rank:2,name:"春木屋ほかラーメン激戦区",category:"グルメ",description:"荻窪ラーメン発祥の地、名店が集結",icon:"🍜"},{rank:1,name:"ラーメンとクラシックの文化",category:"ランドマーク",description:"食と音楽の文化が根付く、大人の中央線暮らし",icon:"✨"}]},
  {slug:"nishi-kasai",name:"西葛西",area:"江戸川区",station:["西葛西駅"],lines:["東京メトロ東西線"],catchcopy:"リトルインディアと海の見える公園の街",description:"インド人コミュニティが大きく「リトルインディア」とも呼ばれる。葛西臨海公園も近く、家賃も手頃。東西線で大手町まで20分。",vibe:["多国籍","インド","海","コスパ","東西線"],popularity:2,avgRent:{oneRoom:"6.0万",oneK:"7.5万",oneLDK:"11.5万"},bestFor:["グルメ好き","海好き","コスパ重視"],commuteMinutes:{"渋谷":30,"新宿":28,"東京":20,"池袋":30,"品川":28},spots:[{rank:10,name:"フラワーガーデン",category:"公園・自然",description:"四季折々の花が楽しめる区立公園",icon:"🌺"},{rank:9,name:"西葛西の銭湯",category:"生活便利",description:"スーパー銭湯が充実",icon:"♨️"},{rank:8,name:"インド食材店",category:"ショッピング",description:"本場のスパイスや食材が手に入る",icon:"🫚"},{rank:7,name:"葛西臨海水族園",category:"ランドマーク",description:"マグロの群泳が見られる人気水族園",icon:"🐠"},{rank:6,name:"インドカレー激戦区",category:"グルメ",description:"本場のインド人シェフによる本格カレー店が多数",icon:"🍛"},{rank:5,name:"東西線の利便性",category:"生活便利",description:"大手町まで20分、日本橋も近い",icon:"🚃"},{rank:4,name:"家賃の手頃さ",category:"生活便利",description:"東西線沿線で6万円台は魅力的",icon:"💰"},{rank:3,name:"ディワリ祭り",category:"イベント",description:"インドの光の祭典が西葛西で開催",icon:"🪔"},{rank:2,name:"葛西臨海公園",category:"公園・自然",description:"大観覧車と海が見える都内屈指の公園",icon:"🎡"},{rank:1,name:"多文化とコスパの共存",category:"ランドマーク",description:"インド文化と海辺の暮らし、東京の新しい多様性",icon:"🌏"}]},
  {slug:"itabashi",name:"板橋",area:"板橋区",station:["板橋駅"],lines:["JR埼京線"],catchcopy:"池袋2分の、知られざるお隣さん",description:"池袋からわずか1駅だが、知名度は低い超穴場。十条方面のアーケード商店街も近く、下町の生活感と都心アクセスが共存。",vibe:["穴場","池袋近い","コスパ","下町","埼京線"],popularity:1,avgRent:{oneRoom:"6.0万",oneK:"7.5万",oneLDK:"11.5万"},bestFor:["池袋勤務","コスパ重視","穴場好き"],commuteMinutes:{"渋谷":12,"新宿":8,"東京":18,"池袋":2,"品川":22},spots:[{rank:10,name:"板橋区立美術館",category:"文化・アート",description:"企画展が面白い区立美術館",icon:"🎨"},{rank:9,name:"石神井川の桜",category:"公園・自然",description:"川沿いの桜並木は隠れた花見スポット",icon:"🌸"},{rank:8,name:"板橋宿",category:"ランドマーク",description:"中山道の宿場町の歴史が残る",icon:"🏚️"},{rank:7,name:"十条商店街（近隣）",category:"ショッピング",description:"日本一安いと言われる商店街まで散歩圏",icon:"🛒"},{rank:6,name:"加賀公園",category:"公園・自然",description:"加賀藩下屋敷跡の公園",icon:"🌿"},{rank:5,name:"板橋の飲食店",category:"グルメ",description:"穴場ゆえに隠れた名店が多い",icon:"🍽️"},{rank:4,name:"池袋1駅の圧倒的アクセス",category:"生活便利",description:"埼京線で池袋まで約2分",icon:"🚃"},{rank:3,name:"家賃の安さ",category:"生活便利",description:"池袋の隣で6万円台は驚き",icon:"💰"},{rank:2,name:"埼京線の便利さ",category:"生活便利",description:"新宿・渋谷方面に乗り換えなし",icon:"🚉"},{rank:1,name:"池袋の隣という贅沢な穴場",category:"ランドマーク",description:"池袋2分なのに誰も知らない、最強のコスパ駅",icon:"👑"}]},
  {slug:"nogata",name:"野方",area:"中野区",station:["野方駅"],lines:["西武新宿線"],catchcopy:"活気ある商店街とレトロが交差する穴場",description:"駅前から伸びる野方商店街は活気に溢れ、飲食店も充実。中野・高円寺にも近く、穴場ながら生活利便性は高い。",vibe:["商店街","穴場","中野近い","レトロ","コスパ"],popularity:1,avgRent:{oneRoom:"5.8万",oneK:"7.5万",oneLDK:"11.0万"},bestFor:["一人暮らしデビュー","商店街好き","コスパ重視"],commuteMinutes:{"渋谷":22,"新宿":12,"東京":28,"池袋":18,"品川":30},spots:[{rank:10,name:"中野方面への散歩",category:"ランドマーク",description:"中野ブロードウェイまで歩ける距離",icon:"🚶"},{rank:9,name:"野方の銭湯",category:"生活便利",description:"地域の銭湯文化が健在",icon:"♨️"},{rank:8,name:"野方の食べ歩き",category:"グルメ",description:"コロッケ、焼き鳥、惣菜の食べ歩き天国",icon:"🍢"},{rank:7,name:"環七沿いのラーメン",category:"グルメ",description:"環七ラーメン街道の恩恵を受ける",icon:"🍜"},{rank:6,name:"西武新宿線で新宿12分",category:"生活便利",description:"各停でも新宿12分の好アクセス",icon:"🚃"},{rank:5,name:"野方ホープ（ラーメン）",category:"グルメ",description:"背脂系ラーメンの名店が発祥",icon:"🍜"},{rank:4,name:"家賃の安さ",category:"生活便利",description:"中野区で6万円以下も可能",icon:"💰"},{rank:3,name:"高円寺エリアも徒歩圏",category:"ランドマーク",description:"高円寺の文化も享受できる距離",icon:"🎸"},{rank:2,name:"野方商店街",category:"ショッピング",description:"150以上の店舗が並ぶ活気ある商店街",icon:"🛒"},{rank:1,name:"商店街暮らしの温かさ",category:"ランドマーク",description:"「いつもの」が言える距離感の街",icon:"🏡"}]},
  {slug:"senzoku",name:"洗足",area:"目黒区",station:["洗足駅"],lines:["東急目黒線"],catchcopy:"目黒区の静かな高台、品のある住宅街",description:"洗足池にも近い目黒区の閑静な高台住宅街。目黒線で目黒まで8分、品のある暮らしが手に入る穴場。",vibe:["閑静","高台","目黒区","品格","穴場"],popularity:1,avgRent:{oneRoom:"7.0万",oneK:"8.5万",oneLDK:"13.5万"},bestFor:["静かに暮らしたい人","30代カップル","品のある暮らし"],commuteMinutes:{"渋谷":15,"新宿":22,"東京":25,"池袋":28,"品川":15},spots:[{rank:10,name:"洗足のパン屋",category:"グルメ",description:"住宅街に隠れた名ベーカリー",icon:"🍞"},{rank:9,name:"目黒区の図書館",category:"生活便利",description:"落ち着いた環境で読書を楽しめる",icon:"📚"},{rank:8,name:"洗足駅前の商店",category:"ショッピング",description:"小さいけれど必要な店は揃う",icon:"🛒"},{rank:7,name:"昭和大学",category:"ランドマーク",description:"大学が街に落ち着いた雰囲気を添える",icon:"🎓"},{rank:6,name:"品川方面のアクセス",category:"生活便利",description:"目黒線で品川方面にスムーズ",icon:"🚃"},{rank:5,name:"洗足池への散歩",category:"公園・自然",description:"洗足池まで歩ける距離、週末散歩に最適",icon:"🚶"},{rank:4,name:"高台の住宅街",category:"ランドマーク",description:"水はけが良く、眺望も楽しめる高台",icon:"🏡"},{rank:3,name:"目黒区アドレス",category:"生活便利",description:"目黒区で7万円台は穴場価格",icon:"💰"},{rank:2,name:"洗足池公園",category:"公園・自然",description:"ボートにも乗れる緑豊かな池の公園",icon:"🚣"},{rank:1,name:"目黒区の静かな品格",category:"ランドマーク",description:"主張しない上質さ、それが洗足の魅力",icon:"✨"}]},
  {slug:"chitose-karasuyama",name:"千歳烏山",area:"世田谷区",station:["千歳烏山駅"],lines:["京王線"],catchcopy:"京王線の実力派、世田谷の生活拠点",description:"京王線の特急停車駅で新宿まで17分。駅前は商店街が充実し、仙川方面のおしゃれなカフェも徒歩圏。世田谷区の北西部を代表する生活拠点。",vibe:["京王線","商店街","世田谷","利便性","実力派"],popularity:2,avgRent:{oneRoom:"6.5万",oneK:"8.0万",oneLDK:"12.5万"},bestFor:["新宿勤務","世田谷に住みたい人","実用重視"],commuteMinutes:{"渋谷":22,"新宿":17,"東京":32,"池袋":28,"品川":30},spots:[{rank:10,name:"蘆花恒春園（芦花公園）",category:"公園・自然",description:"徳冨蘆花の旧宅が残る緑豊かな公園",icon:"🌿"},{rank:9,name:"仙川のカフェ散歩",category:"カフェ",description:"隣の仙川駅周辺はおしゃれカフェの宝庫",icon:"☕"},{rank:8,name:"烏山区民センター",category:"生活便利",description:"図書館・ホールが入る区民施設",icon:"🏛️"},{rank:7,name:"烏山の寺院街",category:"ランドマーク",description:"26もの寺院が集まる「烏山寺町」",icon:"🙏"},{rank:6,name:"世田谷区の住環境",category:"生活便利",description:"教育・医療・治安が揃った環境",icon:"🏡"},{rank:5,name:"京王線特急停車",category:"生活便利",description:"特急で新宿まで17分の速さ",icon:"🚃"},{rank:4,name:"ちとから商店街",category:"ショッピング",description:"100以上の店舗が並ぶ充実の商店街",icon:"🛒"},{rank:3,name:"世田谷で7万円台",category:"生活便利",description:"世田谷区で6万円台からは穴場価格",icon:"💰"},{rank:2,name:"烏山の飲食店街",category:"グルメ",description:"安くて美味しい個人店が充実",icon:"🍽️"},{rank:1,name:"堅実な暮らしの街",category:"ランドマーク",description:"派手さはないが、全部揃う安心の世田谷暮らし",icon:"⚖️"}]},
  {slug:"kiba",name:"木場",area:"江東区",station:["木場駅"],lines:["東京メトロ東西線"],catchcopy:"現代美術と公園の、ウォーターフロント穴場",description:"東京都現代美術館と木場公園を擁する文化的エリア。東西線で大手町まで15分、門前仲町も近い穴場。",vibe:["アート","公園","東西線","ウォーターフロント","穴場"],popularity:2,avgRent:{oneRoom:"8.0万",oneK:"10.0万",oneLDK:"15.0万"},bestFor:["アート好き","都心勤務","30代カップル"],commuteMinutes:{"渋谷":28,"新宿":25,"東京":15,"池袋":28,"品川":25},spots:[{rank:10,name:"運河沿いの散歩",category:"公園・自然",description:"木場の運河沿いは気持ちの良い散歩コース",icon:"🚶"},{rank:9,name:"深川ギャザリア",category:"ショッピング",description:"映画館やスーパーが入る複合施設",icon:"🏬"},{rank:8,name:"木場の角乗り",category:"イベント",description:"水に浮かべた材木の上で技を披露する伝統行事",icon:"🪵"},{rank:7,name:"門前仲町への散歩",category:"ランドマーク",description:"深川の下町情緒を楽しめる散歩圏",icon:"🚶"},{rank:6,name:"東西線の便利さ",category:"生活便利",description:"大手町15分、日本橋も近い",icon:"🚃"},{rank:5,name:"木場公園BBQ広場",category:"公園・自然",description:"都心でBBQが楽しめる貴重な場所",icon:"🍖"},{rank:4,name:"深川図書館",category:"生活便利",description:"充実した蔵書の区立図書館",icon:"📚"},{rank:3,name:"木場公園",category:"公園・自然",description:"広大な芝生広場とスポーツ施設",icon:"🌳"},{rank:2,name:"東京都現代美術館",category:"文化・アート",description:"MOTの愛称で知られる現代美術の殿堂",icon:"🎨"},{rank:1,name:"アートと緑のウォーターフロント",category:"ランドマーク",description:"美術館と公園が日常になる、文化的な暮らし",icon:"✨"}]},
  {slug:"hikarigaoka",name:"光が丘",area:"練馬区",station:["光が丘駅"],lines:["都営大江戸線"],catchcopy:"巨大公園と団地が織りなす、緑の楽園",description:"光が丘公園の広大な緑と、計画的に造られた団地街。大江戸線の始発駅で座って通勤可能。子育て環境は都内トップクラス。",vibe:["公園","団地","始発","ファミリー","緑"],popularity:2,avgRent:{oneRoom:"5.5万",oneK:"7.0万",oneLDK:"10.5万"},bestFor:["ファミリー","始発駅狙い","自然好き"],commuteMinutes:{"渋谷":35,"新宿":28,"東京":38,"池袋":30,"品川":38},spots:[{rank:10,name:"IMA(イマ)ショッピングセンター",category:"ショッピング",description:"日常の買い物が全部済む駅直結施設",icon:"🏬"},{rank:9,name:"光が丘図書館",category:"生活便利",description:"充実した蔵書の区立図書館",icon:"📚"},{rank:8,name:"バーベキュー広場",category:"公園・自然",description:"公園内で気軽にBBQが楽しめる",icon:"🍖"},{rank:7,name:"大江戸線始発",category:"生活便利",description:"始発駅で座って通勤できる贅沢",icon:"💺"},{rank:6,name:"けやき並木の紅葉",category:"公園・自然",description:"秋のけやき通りは黄金色のトンネル",icon:"🍂"},{rank:5,name:"団地コミュニティ",category:"ランドマーク",description:"計画都市ならではの充実したコミュニティ",icon:"🏘️"},{rank:4,name:"光が丘公園のスポーツ施設",category:"生活便利",description:"テニスコート・野球場・体育館が揃う",icon:"🏟️"},{rank:3,name:"子育て環境",category:"生活便利",description:"保育園・学校・病院が計画的に配置",icon:"👶"},{rank:2,name:"家賃の安さ",category:"生活便利",description:"1LDKで10万円台、ファミリーにも優しい",icon:"💰"},{rank:1,name:"光が丘公園",category:"公園・自然",description:"60万㎡超の広大な緑地、東京にいることを忘れる",icon:"🌳"}]},
  {slug:"tetsugakudo",name:"新江古田",area:"中野区",station:["新江古田駅"],lines:["都営大江戸線"],catchcopy:"哲学堂のある、考える人の街",description:"東洋大学創設者・井上円了が造った哲学堂公園が近い知的な街。大江戸線で新宿へ15分、練馬区との境界にある穏やかなエリア。",vibe:["哲学","知的","公園","穴場","静か"],popularity:1,avgRent:{oneRoom:"6.0万",oneK:"7.5万",oneLDK:"11.5万"},bestFor:["知的な暮らし","散歩好き","穴場好き"],commuteMinutes:{"渋谷":25,"新宿":15,"東京":30,"池袋":18,"品川":30},spots:[{rank:10,name:"江古田の森公園",category:"公園・自然",description:"療養所跡地の緑豊かな公園",icon:"🌿"},{rank:9,name:"中野区の図書館",category:"生活便利",description:"近くに区立図書館がある",icon:"📚"},{rank:8,name:"新江古田の住宅街",category:"ランドマーク",description:"静かで落ち着いた住環境",icon:"🏡"},{rank:7,name:"大江戸線で都心へ",category:"生活便利",description:"新宿15分、六本木も乗り換えなし",icon:"🚃"},{rank:6,name:"江古田方面の散歩",category:"ランドマーク",description:"日大芸術学部がある江古田も徒歩圏",icon:"🚶"},{rank:5,name:"家賃の手頃さ",category:"生活便利",description:"中野区で6万円台の穴場価格",icon:"💰"},{rank:4,name:"哲学堂公園の四季",category:"公園・自然",description:"桜・紅葉・雪景色、四季の哲学散歩",icon:"🍁"},{rank:3,name:"哲学の庭",category:"文化・アート",description:"世界の哲学者が集う哲学堂内の彫刻群",icon:"🤔"},{rank:2,name:"妙正寺川沿い散歩",category:"公園・自然",description:"川沿いの遊歩道で瞑想的な散歩",icon:"🚶"},{rank:1,name:"哲学堂公園",category:"公園・自然",description:"哲学をテーマにした日本唯一の公園",icon:"📖"}]},
  {slug:"musashisakai",name:"武蔵境",area:"武蔵野市",station:["武蔵境駅"],lines:["JR中央線","西武多摩川線"],catchcopy:"吉祥寺の隣、知られざる武蔵野の穴場",description:"吉祥寺の1つ隣の駅で、武蔵野プレイスという美しい図書館が話題。境浄水場の桜並木も美しく、静かな武蔵野暮らしが手に入る。",vibe:["図書館","吉祥寺隣","静か","武蔵野","桜"],popularity:1,avgRent:{oneRoom:"5.8万",oneK:"7.5万",oneLDK:"11.5万"},bestFor:["読書好き","吉祥寺好き","穴場好き"],commuteMinutes:{"渋谷":25,"新宿":20,"東京":30,"池袋":25,"品川":32},spots:[{rank:10,name:"西武多摩川線",category:"生活便利",description:"レトロなローカル線で多摩川方面へ",icon:"🚃"},{rank:9,name:"境浄水場の桜並木",category:"公園・自然",description:"圧巻の桜のトンネル",icon:"🌸"},{rank:8,name:"ラーメン街道（五日市街道）",category:"グルメ",description:"名店が並ぶラーメン激戦区",icon:"🍜"},{rank:7,name:"吉祥寺まで1駅",category:"生活便利",description:"中央線で1駅、歩いても行ける距離",icon:"🚶"},{rank:6,name:"独歩の森（近隣）",category:"公園・自然",description:"国木田独歩が愛した武蔵野の面影",icon:"🌿"},{rank:5,name:"スキップ通り商店街",category:"ショッピング",description:"駅前の活気ある商店街",icon:"🛒"},{rank:4,name:"中央線で新宿20分",category:"生活便利",description:"中央線各停でも新宿20分",icon:"🚃"},{rank:3,name:"吉祥寺より安い家賃",category:"生活便利",description:"隣なのに家賃は2万円以上安い",icon:"💰"},{rank:2,name:"武蔵野の自然",category:"公園・自然",description:"武蔵野の雑木林の面影が残る緑豊かな環境",icon:"🌳"},{rank:1,name:"武蔵野プレイス",category:"文化・アート",description:"日本一美しいと評される複合図書館施設",icon:"📚"}]},
  {slug:"komaba-todaimae",name:"駒場東大前",area:"目黒区",station:["駒場東大前駅"],lines:["京王井の頭線"],catchcopy:"東大キャンパスの緑に包まれた学生街",description:"東大駒場キャンパスに隣接し、緑豊かで静かな環境。渋谷から井の頭線で3分なのに、とても落ち着いた住宅街。",vibe:["アカデミック","緑","渋谷近い","静か","学生街"],popularity:2,avgRent:{oneRoom:"7.5万",oneK:"9.5万",oneLDK:"14.5万"},bestFor:["学生","研究者","渋谷勤務"],commuteMinutes:{"渋谷":3,"新宿":15,"東京":22,"池袋":22,"品川":18},spots:[{rank:10,name:"東大駒場の学食",category:"グルメ",description:"一般利用可、安くて美味しい学食",icon:"🍚"},{rank:9,name:"旧前田侯爵邸",category:"文化・アート",description:"洋館と和館が見学できる文化財",icon:"🏛️"},{rank:8,name:"淡島通りのカフェ",category:"カフェ",description:"学生街ならではのおしゃれカフェが点在",icon:"☕"},{rank:7,name:"松濤方面の散歩",category:"ランドマーク",description:"高級住宅街・松濤も散歩圏内",icon:"🚶"},{rank:6,name:"井の頭線で渋谷3分",category:"生活便利",description:"渋谷まで3分の圧倒的アクセス",icon:"🚃"},{rank:5,name:"駒場野公園",category:"公園・自然",description:"昆虫観察もできる自然豊かな公園",icon:"🦋"},{rank:4,name:"日本近代文学館",category:"文化・アート",description:"文学好きには堪らない専門図書館",icon:"📚"},{rank:3,name:"駒場公園",category:"公園・自然",description:"旧前田侯爵邸のある静かな公園",icon:"🌿"},{rank:2,name:"東大駒場キャンパス",category:"公園・自然",description:"銀杏並木と広大な緑のキャンパスを散歩",icon:"🌳"},{rank:1,name:"渋谷3分の異世界",category:"ランドマーク",description:"渋谷の喧騒が嘘のような、アカデミックな静寂",icon:"✨"}]},
  {slug:"myoden",name:"妙典",area:"市川市",station:["妙典駅"],lines:["東京メトロ東西線"],catchcopy:"東西線の穴場、江戸川を渡った先の快適暮らし",description:"東西線で大手町まで25分。駅前にイオンがあり生活利便性は高く、江戸川の河川敷で自然も楽しめる。千葉県だが都内感覚で暮らせる。",vibe:["コスパ","東西線","河川敷","ファミリー","穴場"],popularity:1,avgRent:{oneRoom:"5.0万",oneK:"6.5万",oneLDK:"9.5万"},bestFor:["コスパ重視","ファミリー","東西線沿線勤務"],commuteMinutes:{"渋谷":38,"新宿":35,"東京":25,"池袋":35,"品川":35},spots:[{rank:10,name:"妙典のラーメン店",category:"グルメ",description:"駅周辺に美味しいラーメン店が複数",icon:"🍜"},{rank:9,name:"行徳近郊緑地",category:"公園・自然",description:"野鳥観察ができる緑地",icon:"🐦"},{rank:8,name:"常夜灯公園",category:"公園・自然",description:"歴史ある常夜灯が残る水辺の公園",icon:"🏮"},{rank:7,name:"イオン妙典",category:"ショッピング",description:"駅前の大型ショッピングモールで何でも揃う",icon:"🏬"},{rank:6,name:"東西線の利便性",category:"生活便利",description:"大手町25分、日本橋方面に便利",icon:"🚃"},{rank:5,name:"江戸川の花火大会",category:"イベント",description:"河川敷から花火が間近で楽しめる",icon:"🎆"},{rank:4,name:"家賃の圧倒的安さ",category:"生活便利",description:"東西線沿線で5万円台は破格",icon:"💰"},{rank:3,name:"子育て環境",category:"生活便利",description:"公園・学校が計画的に配置された住環境",icon:"👶"},{rank:2,name:"江戸川河川敷",category:"公園・自然",description:"ランニング・サイクリング・BBQの楽園",icon:"🏃"},{rank:1,name:"東西線の隠れた理想郷",category:"ランドマーク",description:"都心25分でこのコスパ、知る人ぞ知る穴場",icon:"💎"}]},
  {slug:"aoto",name:"青砥",area:"葛飾区",station:["青砥駅"],lines:["京成本線","京成押上線"],catchcopy:"成田も羽田も直通、下町の空港アクセス王",description:"京成線の分岐駅で、成田空港にも羽田空港にも乗り換えなし。下町の落ち着いた暮らしと空港アクセスが両立する珍しい街。",vibe:["空港アクセス","下町","京成線","穴場","コスパ"],popularity:1,avgRent:{oneRoom:"5.5万",oneK:"7.0万",oneLDK:"10.5万"},bestFor:["出張族","旅行好き","コスパ重視"],commuteMinutes:{"渋谷":32,"新宿":28,"東京":22,"池袋":30,"品川":28},spots:[{rank:10,name:"青砥の銭湯",category:"生活便利",description:"地元の銭湯でのんびり",icon:"♨️"},{rank:9,name:"曳舟川親水公園（近隣）",category:"公園・自然",description:"水と親しめる区の親水公園",icon:"💧"},{rank:8,name:"立石方面の飲み歩き",category:"夜の街",description:"隣の立石でせんべろ文化を楽しむ",icon:"🍺"},{rank:7,name:"青砥の商店街",category:"ショッピング",description:"生活に必要なものが揃う地元の商店街",icon:"🛒"},{rank:6,name:"中川沿いの散歩",category:"公園・自然",description:"川沿いの遊歩道で下町散歩",icon:"🚶"},{rank:5,name:"家賃の安さ",category:"生活便利",description:"葛飾区で5万円台から住める",icon:"💰"},{rank:4,name:"京成線の穴場",category:"生活便利",description:"日暮里・上野方面にスムーズアクセス",icon:"🚃"},{rank:3,name:"成田空港直通",category:"生活便利",description:"アクセス特急で成田空港まで1本",icon:"✈️"},{rank:2,name:"羽田空港直通",category:"生活便利",description:"京急直通で羽田空港も乗り換えなし",icon:"🛫"},{rank:1,name:"成田も羽田も1本の街",category:"ランドマーク",description:"空港アクセス最強の穴場、出張族の楽園",icon:"🌍"}]},
  {slug:"oji",name:"王子",area:"北区",station:["王子駅"],lines:["JR京浜東北線","東京メトロ南北線"],catchcopy:"飛鳥山の桜と都電が走る、北区の玄関口",description:"飛鳥山公園の桜で有名な北区のターミナル駅。京浜東北線と南北線の2路線が使え、東京駅方面へのアクセスも良好。都電荒川線も走る。",vibe:["桜","都電","2路線","下町","公園"],popularity:3,avgRent:{oneRoom:"6.5万",oneK:"8.0万",oneLDK:"12.5万"},bestFor:["花好き","2路線使いたい人","コスパ重視"],commuteMinutes:{"渋谷":22,"新宿":18,"東京":15,"池袋":10,"品川":18},spots:[{rank:10,name:"音無親水公園",category:"公園・自然",description:"石神井川の旧流路を整備した親水公園",icon:"💧"},{rank:9,name:"都電荒川線",category:"ランドマーク",description:"飛鳥山の前を通る東京の路面電車",icon:"🚋"},{rank:8,name:"北とぴあ展望台",category:"ランドマーク",description:"17階の無料展望台から新幹線が見える",icon:"🏙️"},{rank:7,name:"王子神社",category:"ランドマーク",description:"「王子」の地名の由来となった神社",icon:"⛩️"},{rank:6,name:"紙の博物館",category:"文化・アート",description:"日本の製紙業の歴史を学べるユニーク施設",icon:"📄"},{rank:5,name:"京浜東北線×南北線",category:"生活便利",description:"JRとメトロ2路線の安心感",icon:"🚉"},{rank:4,name:"渋沢栄一ゆかりの地",category:"ランドマーク",description:"新一万円札の顔が暮らした街",icon:"💴"},{rank:3,name:"王子の飲食店",category:"グルメ",description:"駅前に手頃な飲食店が充実",icon:"🍽️"},{rank:2,name:"飛鳥山のアジサイ・紅葉",category:"公園・自然",description:"桜だけでなく四季折々の花と紅葉も",icon:"🍁"},{rank:1,name:"飛鳥山公園の桜",category:"公園・自然",description:"徳川吉宗が造った花見の名所、600本の桜",icon:"🌸"}]},
  {slug:"senkawa",name:"千川",area:"豊島区",station:["千川駅"],lines:["東京メトロ有楽町線","東京メトロ副都心線"],catchcopy:"池袋の隣で静かに暮らす、知られざる2路線駅",description:"池袋から1駅の穴場。有楽町線と副都心線が使え、渋谷にも銀座にも乗り換えなし。でも駅を出ればとても静かな住宅街。",vibe:["穴場","池袋隣","2路線","静か","コスパ"],popularity:1,avgRent:{oneRoom:"6.5万",oneK:"8.0万",oneLDK:"12.0万"},bestFor:["池袋勤務","穴場好き","コスパ重視"],commuteMinutes:{"渋谷":18,"新宿":15,"東京":20,"池袋":3,"品川":25},spots:[{rank:10,name:"千川の住宅街",category:"ランドマーク",description:"池袋の隣とは思えない静かな環境",icon:"🏡"},{rank:9,name:"千川通り",category:"ランドマーク",description:"桜並木が美しいメインストリート",icon:"🌸"},{rank:8,name:"要町方面の散歩",category:"ランドマーク",description:"要町〜池袋方面をのんびり散歩",icon:"🚶"},{rank:7,name:"千川の飲食店",category:"グルメ",description:"知られていない分、穴場の名店がある",icon:"🍽️"},{rank:6,name:"小竹向原方面",category:"ランドマーク",description:"練馬区方面の静かな住宅街が広がる",icon:"🏘️"},{rank:5,name:"有楽町線で銀座へ",category:"生活便利",description:"銀座一丁目まで乗り換えなし",icon:"💎"},{rank:4,name:"副都心線で渋谷へ",category:"生活便利",description:"渋谷まで乗り換えなし18分",icon:"🚃"},{rank:3,name:"2路線使える贅沢",category:"生活便利",description:"有楽町線と副都心線のダブルアクセス",icon:"🚉"},{rank:2,name:"池袋1駅の安心感",category:"生活便利",description:"池袋まで3分、日常使いに最強",icon:"⏱️"},{rank:1,name:"池袋1駅なのに、この穴場感",category:"ランドマーク",description:"知られていないことが最大の魅力",icon:"🤫"}]},
  {slug:"mukojima",name:"向島",area:"墨田区",station:["とうきょうスカイツリー駅","曳舟駅"],lines:["東武スカイツリーライン"],catchcopy:"スカイツリーのお膝元、花街の面影残る下町",description:"スカイツリーの足元に広がる、かつての花街の面影が残るディープな下町。向島百花園や隅田川の桜が美しく、再開発と下町が共存。",vibe:["スカイツリー","下町","花街","隅田川","レトロ"],popularity:2,avgRent:{oneRoom:"7.0万",oneK:"8.5万",oneLDK:"13.0万"},bestFor:["下町好き","スカイツリー好き","レトロ好き"],commuteMinutes:{"渋谷":25,"新宿":25,"東京":18,"池袋":22,"品川":25},spots:[{rank:10,name:"長命寺桜もち",category:"グルメ",description:"創業1717年の桜もちの超老舗",icon:"🌸"},{rank:9,name:"言問団子",category:"グルメ",description:"在原業平ゆかりの名物団子",icon:"🍡"},{rank:8,name:"向島の料亭",category:"グルメ",description:"花街の面影を残す料亭が点在",icon:"🏮"},{rank:7,name:"東武スカイツリーライン",category:"生活便利",description:"浅草まで2駅、押上で半蔵門線直通",icon:"🚃"},{rank:6,name:"隅田川花火大会",category:"イベント",description:"間近で花火が見える特等席エリア",icon:"🎆"},{rank:5,name:"ソラマチ",category:"ショッピング",description:"スカイツリー直下の大型商業施設",icon:"🛍️"},{rank:4,name:"隅田川テラス",category:"公園・自然",description:"川沿いの散歩道はランニングにも最適",icon:"🏃"},{rank:3,name:"向島百花園",category:"公園・自然",description:"江戸時代からの庶民の花園、萩のトンネルが名物",icon:"🌺"},{rank:2,name:"隅田川の桜",category:"公園・自然",description:"隅田川沿いの桜並木は東京屈指の花見名所",icon:"🌸"},{rank:1,name:"スカイツリーの足元暮らし",category:"ランドマーク",description:"634mのタワーを見上げながら、下町の人情に触れる",icon:"🗼"}]},
  {slug:"musashi-seki",name:"武蔵関",area:"練馬区",station:["武蔵関駅"],lines:["西武新宿線"],catchcopy:"池と公園に囲まれた、練馬の自然派穴場",description:"武蔵関公園の富士見池を中心に緑豊かな環境。西武新宿線で新宿へ25分、石神井公園にも近い練馬区の穴場。",vibe:["自然","池","穴場","練馬区","のびのび"],popularity:1,avgRent:{oneRoom:"5.0万",oneK:"6.5万",oneLDK:"10.0万"},bestFor:["自然好き","コスパ重視","ファミリー"],commuteMinutes:{"渋谷":30,"新宿":25,"東京":38,"池袋":22,"品川":35},spots:[{rank:10,name:"石神井公園への散歩",category:"公園・自然",description:"石神井公園まで歩いて行ける距離",icon:"🚶"},{rank:9,name:"武蔵関の商店街",category:"ショッピング",description:"生活に必要なものが揃う駅前商店",icon:"🛒"},{rank:8,name:"善福寺池（近隣）",category:"公園・自然",description:"善福寺公園の池も散歩圏内",icon:"💧"},{rank:7,name:"練馬の農産物直売",category:"グルメ",description:"練馬大根など地元の新鮮野菜",icon:"🥬"},{rank:6,name:"都内最安レベルの家賃",category:"生活便利",description:"練馬区で5万円台から住める",icon:"💰"},{rank:5,name:"吉祥寺方面の散歩",category:"ランドマーク",description:"吉祥寺まで自転車で行ける距離",icon:"🚲"},{rank:4,name:"西武新宿線で新宿へ",category:"生活便利",description:"新宿まで25分のアクセス",icon:"🚃"},{rank:3,name:"練馬の空の広さ",category:"ランドマーク",description:"高い建物が少なく、空が広い開放感",icon:"🌤️"},{rank:2,name:"富士見池の野鳥",category:"公園・自然",description:"カワセミも来る池で野鳥観察",icon:"🐦"},{rank:1,name:"武蔵関公園",category:"公園・自然",description:"富士見池を中心とした緑豊かな公園が日常に",icon:"🌳"}]},
  {slug:"hatchobori",name:"八丁堀",area:"中央区",station:["八丁堀駅"],lines:["JR京葉線","東京メトロ日比谷線"],catchcopy:"東京駅徒歩圏の、知られざるシティ穴場",description:"東京駅から歩ける距離にありながら、知名度は低い穴場。京葉線と日比谷線が使え、銀座も築地も徒歩圏。都心のど真ん中で意外と住める。",vibe:["都心","東京駅近い","銀座近い","穴場","シティ"],popularity:1,avgRent:{oneRoom:"9.5万",oneK:"11.5万",oneLDK:"17.0万"},bestFor:["都心勤務","銀座好き","利便性最優先"],commuteMinutes:{"渋谷":20,"新宿":18,"東京":5,"池袋":22,"品川":12},spots:[{rank:10,name:"鉄砲洲稲荷神社",category:"ランドマーク",description:"富士塚がある都心の由緒ある神社",icon:"⛩️"},{rank:9,name:"亀島川の水辺",category:"公園・自然",description:"都心のウォーターフロントを感じる水辺",icon:"🌊"},{rank:8,name:"築地場外市場",category:"グルメ",description:"築地の食の宝庫が徒歩圏内",icon:"🐟"},{rank:7,name:"京葉線でディズニー",category:"生活便利",description:"京葉線で舞浜まで乗り換えなし15分",icon:"🏰"},{rank:6,name:"日比谷線の利便性",category:"生活便利",description:"銀座・六本木・恵比寿に乗り換えなし",icon:"🚃"},{rank:5,name:"東京駅まで徒歩15分",category:"生活便利",description:"東京駅まで歩ける圧倒的アクセス",icon:"🚶"},{rank:4,name:"銀座まで散歩",category:"ランドマーク",description:"銀座中央通りまで歩いて10分",icon:"💎"},{rank:3,name:"中央区の都心暮らし",category:"ランドマーク",description:"中央区アドレスで東京のど真ん中に住む",icon:"🏙️"},{rank:2,name:"2路線使える",category:"生活便利",description:"JRとメトロ、2路線の安心感",icon:"🚉"},{rank:1,name:"東京駅徒歩圏に住む贅沢",category:"ランドマーク",description:"日本の中心に住む、という究極の利便性",icon:"👑"}]},
];

// 街ごとのカラーテーマ（vibeに合わせた色）
const colorMap = {
  "shimokitazawa": ["#7c3aed","#a855f7"], // パープル — サブカル
  "kichijoji":     ["#059669","#34d399"], // グリーン — 自然
  "nakameguro":    ["#ec4899","#f9a8d4"], // ピンク — おしゃれ
  "yanaka":        ["#b45309","#fbbf24"], // アンバー — レトロ
  "koenji":        ["#dc2626","#f87171"], // レッド — パンク
  "nishi-ogikubo": ["#78716c","#d6d3d1"], // ストーン — 静か
  "sangenjaya":    ["#ea580c","#fb923c"], // オレンジ — 飲み屋
  "kagurazaka":    ["#9333ea","#c084fc"], // バイオレット — 和仏
  "kiyosumi-shirakawa":["#0891b2","#67e8f9"], // シアン — 水辺
  "togoshi-ginza": ["#d97706","#fcd34d"], // イエロー — 商店街
  "ikejiri-ohashi":["#0d9488","#5eead4"], // ティール — 穴場
  "asakusa":       ["#b91c1c","#fca5a5"], // レッド — 祭り
  "ebisu":         ["#4338ca","#818cf8"], // インディゴ — 洗練
  "musashi-koyama":["#ca8a04","#fde047"], // ゴールド — 商店街
  "shibakoen":     ["#1e3a5f","#60a5fa"], // ネイビー — 都心
  "shimotakaido":  ["#65a30d","#bef264"], // ライム — 学生街
  "gakugeidaigaku":["#e11d48","#fda4af"], // ローズ — グルメ
  "nishi-nippori": ["#92400e","#fdba74"], // ブラウン — レトロ
  "futako-tamagawa":["#0284c7","#7dd3fc"], // スカイ — 川
  "kitasenju":     ["#c2410c","#fed7aa"], // オレンジブラウン — 下町
  "monzennakacho": ["#991b1b","#fecaca"], // ダークレッド — 寺社
  "mishuku":       ["#4a5568","#cbd5e1"], // スレート — 隠れ家
  "toritsudaigaku":["#047857","#a7f3d0"], // エメラルド — 並木道
  "nezu":          ["#9a3412","#fdba74"], // テラコッタ — 寺社
  "kuramae":       ["#1e40af","#93c5fd"], // ブルー — クラフト
  "akabane":       ["#dc2626","#fca5a5"], // レッド — 飲み屋
  "nakano":        ["#7c3aed","#c4b5fd"], // パープル — サブカル
  "ningyocho":     ["#78350f","#fde68a"], // ブラウンゴールド — 老舗
  "zoshigaya":     ["#4c1d95","#ddd6fe"], // ディープパープル — 静寂
  "jiyugaoka":     ["#be185d","#fbcfe8"], // マゼンタ — スイーツ
  // 追加20街
  "hatagaya":      ["#0d9488","#5eead4"], // ティール — 穴場
  "oyamadai":      ["#ca8a04","#fde047"], // ゴールド — 商店街
  "iriya":         ["#92400e","#fdba74"], // ブラウン — 下町
  "todaimae":      ["#1e3a5f","#93c5fd"], // ネイビー — アカデミック
  "hakusan":       ["#7c3aed","#ddd6fe"], // パープル — あじさい
  "chitosefunabashi":       ["#059669","#6ee7b7"], // グリーン — 公園
  "yoga":          ["#0284c7","#7dd3fc"], // スカイ — 緑
  "sasazuka":      ["#ea580c","#fdba74"], // オレンジ — 商店街
  "nishikoiwa":    ["#b91c1c","#fca5a5"], // レッド — ディープ
  "todoroki":      ["#047857","#6ee7b7"], // エメラルド — 渓谷
  "kinshicho":     ["#dc2626","#f87171"], // レッド — カオス
  "shin-okachimachi":["#78350f","#fde68a"], // ブラウンゴールド — 下町
  "nishitokyo-tanashi":["#0891b2","#a5f3fc"], // シアン — 郊外
  "kyodo":          ["#65a30d","#bef264"], // ライム — 食
  "okubo":         ["#e11d48","#fda4af"], // ローズ — 多国籍
  "toritsukasei":  ["#78716c","#e7e5e4"], // ストーン — レトロ
  "komazawa-daigaku":["#059669","#34d399"], // グリーン — スポーツ
  "tsukishima":    ["#0369a1","#7dd3fc"], // ブルー — ウォーターフロント
  "koenji-minami": ["#9333ea","#d8b4fe"], // バイオレット — カルチャー
  "otsuka":         ["#b91c1c","#fda4af"], // レッド — レトロ
};

// 各街のUnsplash画像URL
// ※ photo-{timestamp}-{hash} 形式のみ使用（短いIDは直リンク不可）
// ※ 街の実写が無い場合はvibeに合うイメージ写真で代替
const imageMap = {
  "shimokitazawa":    "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&q=80", // 東京の商店街
  "kichijoji":        "https://images.unsplash.com/photo-1610375228550-d5cabc1d4090?w=800&q=80", // 公園の池・緑
  "nakameguro":       "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80", // 桜の川沿い
  "yanaka":           "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", // 日本の古い街並み
  "koenji":           "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80", // カラフルな東京の通り
  "nishi-ogikubo":    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80", // カフェ・本棚
  "sangenjaya":       "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", // 居心地いいカフェ
  "kagurazaka":       "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80", // 東京の風情ある夜景
  "kiyosumi-shirakawa":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80", // コーヒー
  "togoshi-ginza":    "https://images.unsplash.com/photo-1590559899731-a382cb57f700?w=800&q=80", // 日本の商店街
  "ikejiri-ohashi":   "https://images.unsplash.com/photo-1576842546582-7e5a1e6fe06c?w=800&q=80", // 静かな住宅街
  "asakusa":          "https://images.unsplash.com/photo-1583766395091-2eb9994ed094?w=800&q=80", // 浅草寺
  "ebisu":            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", // 東京タワーと都市
  "musashi-koyama":   "https://images.unsplash.com/photo-1617096200347-cb04ae810b1d?w=800&q=80", // 商店街アーケード
  "shibakoen":        "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=800&q=80", // 東京タワー
  "shimotakaido":     "https://images.unsplash.com/photo-1576842546582-7e5a1e6fe06c?w=800&q=80", // 住宅街
  "gakugeidaigaku":   "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", // おしゃれレストラン
  "nishi-nippori":    "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=800&q=80", // レトロな下町路地
  "futako-tamagawa":  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80", // 緑・公園
  "kitasenju":        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80", // 居酒屋・飲み屋
  "monzennakacho":    "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&q=80", // 神社
  "mishuku":          "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?w=800&q=80", // バー
  "toritsudaigaku":   "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", // パティスリー
  "nezu":             "https://images.unsplash.com/photo-1570459027562-4a916cc6113f?w=800&q=80", // 神社・鳥居
  "kuramae":          "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=800&q=80", // クラフトカフェ
  "akabane":          "https://images.unsplash.com/photo-1555658636-6e4a36218be7?w=800&q=80", // 居酒屋横丁
  "nakano":           "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800&q=80", // アニメ・フィギュア
  "ningyocho":        "https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?w=800&q=80", // 和菓子・伝統
  "zoshigaya":        "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", // 静かな日本の路地
  "jiyugaoka":        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80", // おしゃれカフェ
  // 追加20街
  "hatagaya":         "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80", // カフェ
  "oyamadai":         "https://images.unsplash.com/photo-1590559899731-a382cb57f700?w=800&q=80", // 商店街
  "iriya":            "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", // 下町
  "todaimae":         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", // 大学の雰囲気
  "hakusan":          "https://images.unsplash.com/photo-1462275646964-a0e3c11f18a6?w=800&q=80", // あじさい
  "chitosefunabashi": "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&q=80", // 公園・緑
  "yoga":             "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80", // 緑の公園
  "sasazuka":         "https://images.unsplash.com/photo-1590559899731-a382cb57f700?w=800&q=80", // 商店街
  "nishikoiwa":       "https://images.unsplash.com/photo-1555658636-6e4a36218be7?w=800&q=80", // 居酒屋
  "todoroki":         "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", // 森・渓谷
  "kinshicho":        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", // 東京都市
  "shin-okachimachi": "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80", // 下町
  "nishitokyo-tanashi":"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", // 広い空
  "kyodo":            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", // レストラン
  "okubo":            "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80", // 食・街
  "toritsukasei":     "https://images.unsplash.com/photo-1576842546582-7e5a1e6fe06c?w=800&q=80", // 住宅街
  "komazawa-daigaku": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80", // ランニング
  "tsukishima":       "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80", // 東京都市
  "koenji-minami":    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80", // カラフルな通り
  "otsuka":           "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80", // 居酒屋
};

// SUUMO 駅コード (ek_XXXXX)
const suumoMap = {
  "shimokitazawa": "18010",
  "kichijoji":     "11640",
  "nakameguro":    "27580",
  "yanaka":        "29650",  // 日暮里駅
  "koenji":        "13930",
  "nishi-ogikubo": "28500",
  "sangenjaya":    "16720",
  "kagurazaka":    "07710",
  "kiyosumi-shirakawa": "50050",
  "togoshi-ginza": "26090",
  "ikejiri-ohashi":"02000",
  "asakusa":       "00670",
  "ebisu":         "05050",
  "musashi-koyama":"38730",
  "shibakoen":     "17570",
  "shimotakaido":  "18140",
  "gakugeidaigaku":"07660",
  "nishi-nippori": "29160",
  "futako-tamagawa":"34230",
  "kitasenju":     "11310",
  "monzennakacho": "39600",
  "mishuku":       "16720",  // 三軒茶屋駅
  "nezu":          "29860",
  "kuramae":       "13010",
  "akabane":       "00380",
  "nakano":        "27280",
  "ningyocho":     "29780",
  "zoshigaya":     "80845",
  "jiyugaoka":     "18410",
  "toritsudaigaku":"26730",
  // 追加20街
  "hatagaya":      "09980",   // 幡ヶ谷
  "oyamadai":      "05160",   // 尾山台
  "iriya":         "02630",   // 入谷
  "todaimae":      "26180",   // 東大前
  "hakusan":       "09410",   // 白山
  "chitosefunabashi":"24970", // 千歳船橋
  "yoga":          "40010",   // 用賀
  "sasazuka":      "16560",   // 笹塚
  "nishikoiwa":    "12210",   // 小岩
  "todoroki":      "26100",   // 等々力
  "kinshicho":     "11980",   // 錦糸町
  "shin-okachimachi":"80710", // 新御徒町
  "nishitokyo-tanashi":"21640",// 田無
  "kyodo":         "11820",   // 経堂
  "okubo":         "05000",   // 大久保
  "toritsukasei":  "26560",   // 都立家政
  "komazawa-daigaku":"13690", // 駒沢大学
  "tsukishima":    "23760",   // 月島
  "koenji-minami": "34060",   // 東高円寺
  "otsuka":        "05060",   // 大塚
};

// 各街にimage, color, externalLinksを追加
const towns = townDefs.map(t => {
  const colors = colorMap[t.slug] || ["#f97316","#fbbf24"];
  // HOMES用: 街の最寄り駅名（最初の駅から「駅」を除去）
  const stationName = t.station[0].replace(/駅$/, "");
  return {
    ...t,
    image: imageMap[t.slug] || "",
    colorFrom: colors[0],
    colorTo: colors[1],
    externalLinks: {
      suumo: suumoMap[t.slug] ? `https://suumo.jp/chintai/tokyo/ek_${suumoMap[t.slug]}/` : "",
      homes: `https://www.homes.co.jp/search/freeword=${encodeURIComponent(stationName)}/`
    }
  };
});

const outPath = join(__dirname, "..", "src", "data", "towns.json");
writeFileSync(outPath, JSON.stringify(towns, null, 2), "utf-8");
console.log(`✅ ${towns.length} towns written to ${outPath}`);
