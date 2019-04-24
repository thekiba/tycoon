export interface Inventory {
    objectId: number;
    objectType: number;
    ts: number;
    id: string;
    personId: string;
    objectName: string;
    name: string;
    zone: string;
    type: number;
    duration: number;
    energyValue: number;
    energyVector: number;
    field: string;
}

export interface WebPush {
    token: string;
    platform: string;
    id: string;
    personId: string;
}

export interface Item {
    type: string;
    name: string;
    value: number;
    period: number;
}

export interface SubscriptionType {
    id: number;
    name: string;
    price_rub: number;
    price_usd: number;
    apple_id: string;
    duration: number;
    items: Item[];
    canBuyTrial: boolean;
}

export interface Person {
    id: string;
    username: string;
    balanceUsd: number;
    balanceBtc: number;
    year: number;
    time: number;
    traffic: number;
    carma: number;
    created: number;
    phone: number;
    aWslots: number;
    aWslotsBtc: number;
    chatBanTill: number;
    extraWorkerSlots: number;
    extraTeamSlots: number;
    extraQuestSlots: number;
    level: number;
    score: number;
    lastSummary: number;
    lastDailyBuffs: number;
    lastEducationMarket: number;
    educationMarketCount: number;
    lastEnergyMarket: number;
    energyMarketCount: number;
    lastGadgetMarket: number;
    gadgetMarketCount: number;
    lastSoftMarket: number;
    softMarketCount: number;
    workerAccountantPaidTill: number;
    inventory: Inventory[];
    siteAccountantPaidTill: number;
    questContracts: any[];
    role: number;
    email: string;
    teamLimit: number;
    workerOfferSlots: number;
    questSlots: number;
    nextScore: number;
    verifiedEmail: boolean;
    dailyBonusTime: number;
    dailyBonusCount: number;
    webPushes: WebPush[];
    subscriptions: any[];
    subscriptionTypes: SubscriptionType[];
}

export interface Limit {
    frontend: number;
    backend: number;
    design: number;
    marketing: number;
}

export interface Progress {
    backend: number;
    frontend: number;
    design: number;
    marketing: number;
    energy: number;
}

export interface Worker {
    name: string;
    type: number;
    salary: number;
    paidTill?: number;
    backend: number;
    frontend: number;
    design: number;
    marketing: number;
    status: number;
    male: number;
    avatar: number[];
    maxEnergy: number;
    energyValue: number;
    energyTs: number;
    energyVector: number;
    backendValue: number;
    backendTs: number;
    backendVector: number;
    frontendValue: number;
    frontendTs: number;
    frontendVector: number;
    designValue: number;
    designTs: number;
    designVector: number;
    marketingValue: number;
    marketingTs: number;
    marketingVector: number;
    id: string;
    loyality: number;
    level: number;
    score: number;
    limit: Limit;
    progress: Progress;
    buffs: any[];
}

export interface Progress2 {
    backend: number;
    frontend: number;
    design: number;
    marketing: number;
    ts: number;
}

export interface Active {
    frontend: number;
    backend: number;
    design: number;
}

export interface KfParam {
    active: Active;
    next: Active;
    custom: boolean;
}

export interface Progress3 {
    ctr: number;
}

export interface Ad {
    cpc: number;
    ctr: number;
    ctrBase: number;
    ctrVector: number;
    adthemeId: number;
    importunity: number;
    status: number;
    startDate: number;
    money: number;
    stopTime?: any;
    nameId: number;
    searchType: number;
    id: string;
    siteId: string;
    personId: string;
    stopDate: number;
    progress: Progress3;
}

export interface Buff {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: string;
    startTime: number;
    endTime: number;
    personId: string;
    siteId: string;
    buffId: number;
}

export interface Content {
    status: number;
    repeat: number;
    match: number;
    ts: number;
    id: string;
    personId: string;
    siteId: string;
    contenttypeId: number;
    duration: number;
}

export interface Sitespeed {
    communityValue: number;
    communityVector: number;
    genericValue: number;
    genericVector: number;
    speedRatioValue: number;
    speedRatioVector: number;
    retention: number;
    frontRatio: number;
    limit: number;
    anno: number;
    ts: number;
    limited: boolean;
    linkValue: number;
    linkVector: number;
    ddosValue: number;
    id: string;
    siteId: string;
    personId: string;
    money: number;
    traffic: number;
    level: number;
    communityExtraValue?: number;
}

export interface Site {
    hostingId: number;
    hostingPaidTill?: number;
    sitetypeId: number;
    sitethemeId: number;
    created: number;
    deletedAt: number;
    anno: number;
    domainTill?: number;
    status: number;
    highlight: boolean;
    debt: number;
    debtBtc: number;
    level: number;
    backend: number;
    backendValue: number;
    backendTs: any;
    backendVector: number;
    frontend: number;
    frontendValue: number;
    frontendTs: any;
    frontendVector: number;
    design: number;
    designValue: number;
    designTs: any;
    designVector: number;
    marketingValue: number;
    marketingTs: any;
    marketingVector: number;
    linkWeight: number;
    extraAdSlots: number;
    autocontentStartTime: number;
    autocontentEndTime: number;
    autoversionStartTime: number;
    autoversionEndTime: number;
    md: number;
    purchasedHostings?: any;
    id: string;
    personId: string;
    engineId: number;
    domainId: string;
    domain: string;
    domainzoneId: number;
    marketing: number;
    btcPayment: boolean;
    domainStatus: number;
    levelUpScore: boolean;
    levelUp: boolean;
    limit: Limit;
    adId: boolean;
    progress: Progress2;
    kfParam: KfParam;
    ad: Ad[];
    buffs: Buff[];
    links: Link[];
    content: Content[];
    adSlots: number;
    sitespeed: Sitespeed[];
}

export interface Link {
    anno: number;
    type: number;
    traffic: number;
    weight: number;
    score: number;
    fromSitethemeId: number;
    toSitethemeId: number;
    fromSitetypeId: number;
    toSitetypeId: number;
    toDomain: string;
    fromDomain: string;
    status: number;
    ts: number;
    id: string;
    fromSiteId: string;
    toSiteId: string;
    personId: string;
    toPersonId: string;
}

export interface EducationThing {
    name: string;
    type: number;
    zone: string;
    level: number;
    duration: number;
    price: number;
    currency: string;
    energyVector: number;
    energyValue: number;
    experienceFactor: number;
    id: string;
    count: number;
    ts: number;
    personId: string;
    educationtypeId: number;
    field: string;
}

export interface Price {
    amount: number;
    currency: string;
}

export interface EducationMarket {
    educationThings: EducationThing[];
    price: Price;
    regenerationTime: number;
}

export interface EnergyThing {
    type: number;
    energyValue: number;
    count: number;
    price: number;
    currency: string;
    ts: number;
    id: string;
    personId: string;
    name: string;
}

export interface Price2 {
    amount: number;
    currency: string;
}

export interface EnergyMarket {
    energyThings: EnergyThing[];
    price: Price2;
    regenerationTime: number;
}

export interface GadgetThing {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: string;
    count: number;
    ts: number;
    personId: string;
    buffId: string;
}

export interface Price3 {
    amount: number;
    currency: string;
}

export interface GadgetMarket {
    gadgetThings: GadgetThing[];
    price: Price3;
    regenerationTime: number;
}

export interface SoftThing {
    type: number;
    count: number;
    duration: number;
    price: number;
    currency: string;
    ts: number;
    id: string;
    personId: string;
    name: string;
}

export interface Price4 {
    amount: number;
    currency: string;
}

export interface SoftMarket {
    softThings: SoftThing[];
    price: Price4;
    regenerationTime: number;
}

export interface Price5 {
    amount: number;
    currency: string;
}

export interface AttackMarket {
    attackThings: any[];
    price: Price5;
    regenerationTime: number;
}

export interface Data {
    id: string;
    workerId: string;
    zone: string;
    name: string;
    type: number;
    male: number;
}

export interface Notification {
    target: string;
    action: string;
    ts: number;
    priority: number;
    data: Data;
    message: string;
    hidden: boolean;
    id: string;
    personId: string;
    workerId: string;
    siteId: string;
}

export interface ExtraParams {
    level: number;
}

export interface Pipeline {
    model: string;
    method: string;
    extraParams: ExtraParams;
}

export interface GoalParam {
    type: string;
    pipeline: Pipeline[];
}

export interface Mentor {
    name: string;
    id: number;
}

export interface Value {
    autoversionType: number;
    count: number;
}

export interface Reward {
    type: number;
    value: Value;
    id: number;
    icon: string;
}

export interface Quest {
    name: string;
    startText: string;
    finalText: string;
    goal: string;
    goalAction: string;
    goalParam: GoalParam;
    questrewardIds: number[];
    previousId: number;
    highlight: any[];
    afterDone?: any;
    showModal?: any;
    minLevel: number;
    id: number;
    mentorId: number;
    status: number;
    mentor: Mentor;
    reward: Reward[];
}

export interface Data2 {
    zone: string;
    scope: string;
}

export interface Task {
    status: number;
    slots: number;
    endTime: number;
    startTime: number;
    data: Data2;
    id: string;
    personId: string;
    siteId: string;
    tasktypeId: number;
    zone: string;
    scope: string;
    workers: string[];
}

export interface DailyBonus12 {
    type: number;
    value: number;
    icon: string;
}

export interface DailyBonus22 {
    type: number;
    count: number;
    objectId: number;
    icon: string;
}

export interface DailyBonus32 {
    type: number;
    count: number;
    objectId: number;
    icon: string;
}

export interface DailyBonus42 {
    type: number;
    value: number;
    icon: string;
}

export interface DailyBonus52 {
    type: number;
    count: number;
    objectId: number;
    icon: string;
}

export interface DailyBonus62 {
    type: number;
    count: number;
    objectId: number;
    icon: string;
}

export interface DailyBonus72 {
    type: number;
    value: number;
    icon: string;
}

export interface DailyBonus {
    1: DailyBonus12;
    2: DailyBonus22;
    3: DailyBonus32;
    4: DailyBonus42;
    5: DailyBonus52;
    6: DailyBonus62;
    7: DailyBonus72;
}

export interface Theme {
    id: number;
    name: string;
    actual: number;
}

export interface Type {
    id: number;
    name: string;
    adSlots: number;
    refSlots: number;
    prSlots: number;
    minLevel: number;
    design: number;
    backend: number;
    frontend: number;
}

export interface Enginetype {
    name: string;
    id: number;
}

export interface Engine {
    name: string;
    enginetypeId: number;
    active: number;
    priceUsd: number;
    priceBtc: number;
    design: number;
    frontend: number;
    backend: number;
    minLevel: number;
    maxSiteLevel: number;
    icon: string;
    id: number;
}

export interface Hosting {
    name: string;
    hostingType: string;
    minLevel: number;
    priceUsd: number;
    priceBtc: number;
    priceOnceUsd: number;
    priceOnceBtc: number;
    minBw: number;
    maxBw: number;
    minBackend: number;
    maxBackend: number;
    icon: string;
    id: number;
}

export interface Tasktype {
    id: number;
    name: string;
    skip: number;
    kind: number;
    zone: string;
    scope: string;
    energy: number;
    slots: number;
    kf: number;
}

export interface Domainzone {
    id: number;
    name: string;
    priceUsd: number;
    priceBtc: number;
    minLevel: number;
    maxLevel?: number;
}

export interface CommunityFall {
    0: number;
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
    21: number;
    22: number;
    23: number;
    24: number;
    25: number;
    26: number;
    27: number;
    28: number;
    29: number;
    30: number;
    31: number;
    32: number;
    33: number;
    34: number;
    35: number;
    36: number;
    37: number;
    38: number;
    39: number;
    40: number;
    41: number;
    42: number;
    43: number;
    44: number;
    45: number;
    46: number;
    47: number;
    48: number;
    49: number;
    50: number;
    51: number;
    52: number;
    53: number;
    54: number;
    55: number;
    56: number;
    57: number;
    58: number;
    59: number;
    60: number;
    61: number;
    62: number;
    63: number;
    64: number;
    65: number;
    66: number;
    67: number;
    68: number;
    69: number;
    70: number;
    71: number;
    72: number;
    73: number;
    74: number;
    75: number;
    76: number;
    77: number;
    78: number;
    79: number;
    80: number;
    81: number;
    82: number;
    83: number;
    84: number;
    85: number;
    86: number;
    87: number;
    88: number;
    89: number;
    90: number;
    91: number;
    92: number;
    93: number;
    94: number;
    95: number;
    96: number;
    97: number;
    98: number;
    99: number;
    100: number;
    101: number;
    102: number;
    103: number;
    104: number;
    105: number;
    106: number;
    107: number;
    108: number;
    109: number;
    110: number;
    111: number;
    112: number;
    113: number;
    114: number;
    115: number;
    116: number;
    117: number;
    118: number;
    119: number;
    120: number;
    121: number;
    122: number;
    123: number;
    124: number;
    125: number;
    126: number;
    127: number;
    128: number;
    129: number;
    130: number;
    131: number;
    132: number;
    133: number;
    134: number;
    135: number;
    136: number;
    137: number;
    138: number;
    139: number;
    140: number;
    141: number;
    142: number;
    143: number;
    144: number;
    145: number;
    146: number;
    147: number;
    148: number;
    149: number;
    150: number;
    151: number;
    152: number;
    153: number;
    154: number;
    155: number;
    156: number;
    157: number;
    158: number;
    159: number;
    160: number;
    161: number;
    162: number;
    163: number;
    164: number;
    165: number;
    166: number;
    167: number;
    168: number;
    169: number;
    170: number;
    171: number;
    172: number;
    173: number;
    174: number;
    175: number;
    176: number;
    177: number;
    178: number;
    179: number;
    180: number;
    181: number;
    182: number;
    183: number;
    184: number;
    185: number;
    186: number;
    187: number;
    188: number;
    189: number;
    190: number;
    191: number;
    192: number;
    193: number;
    194: number;
    195: number;
    196: number;
    197: number;
    198: number;
    199: number;
    200: number;
}

export interface CommunityVectorLimit {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
    21: number;
    22: number;
    23: number;
    24: number;
    25: number;
    26: number;
    27: number;
    28: number;
    29: number;
    30: number;
    31: number;
    32: number;
    33: number;
    34: number;
    35: number;
    36: number;
    37: number;
    38: number;
    39: number;
    40: number;
    41: number;
    42: number;
    43: number;
    44: number;
    45: number;
    46: number;
    47: number;
    48: number;
    49: number;
    50: number;
    51: number;
    52: number;
    53: number;
    54: number;
    55: number;
    56: number;
    57: number;
    58: number;
    59: number;
    60: number;
    61: number;
    62: number;
    63: number;
    64: number;
    65: number;
    66: number;
    67: number;
    68: number;
    69: number;
    70: number;
    71: number;
    72: number;
    73: number;
    74: number;
    75: number;
    76: number;
    77: number;
    78: number;
    79: number;
    80: number;
    81: number;
    82: number;
    83: number;
    84: number;
    85: number;
    86: number;
    87: number;
    88: number;
    89: number;
    90: number;
    91: number;
    92: number;
    93: number;
    94: number;
    95: number;
    96: number;
    97: number;
    98: number;
    99: number;
    100: number;
    101: number;
    102: number;
    103: number;
    104: number;
    105: number;
    106: number;
    107: number;
    108: number;
    109: number;
    110: number;
    111: number;
    112: number;
    113: number;
    114: number;
    115: number;
    116: number;
    117: number;
    118: number;
    119: number;
    120: number;
    121: number;
    122: number;
    123: number;
    124: number;
    125: number;
    126: number;
    127: number;
    128: number;
    129: number;
    130: number;
    131: number;
    132: number;
    133: number;
    134: number;
    135: number;
    136: number;
    137: number;
    138: number;
    139: number;
    140: number;
    141: number;
    142: number;
    143: number;
    144: number;
    145: number;
    146: number;
    147: number;
    148: number;
    149: number;
    150: number;
    151: number;
    152: number;
    153: number;
    154: number;
    155: number;
    156: number;
    157: number;
    158: number;
    159: number;
    160: number;
    161: number;
    162: number;
    163: number;
    164: number;
    165: number;
    166: number;
    167: number;
    168: number;
    169: number;
    170: number;
    171: number;
    172: number;
    173: number;
    174: number;
    175: number;
    176: number;
    177: number;
    178: number;
    179: number;
    180: number;
    181: number;
    182: number;
    183: number;
    184: number;
    185: number;
    186: number;
    187: number;
    188: number;
    189: number;
    190: number;
    191: number;
    192: number;
    193: number;
    194: number;
    195: number;
    196: number;
    197: number;
    198: number;
    199: number;
    200: number;
}

export interface CommunityGen {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
    21: number;
    22: number;
    23: number;
    24: number;
    25: number;
    26: number;
    27: number;
    28: number;
    29: number;
    30: number;
    31: number;
    32: number;
    33: number;
    34: number;
    35: number;
    36: number;
    37: number;
    38: number;
    39: number;
    40: number;
    41: number;
    42: number;
    43: number;
    44: number;
    45: number;
    46: number;
    47: number;
    48: number;
    49: number;
    50: number;
    51: number;
    52: number;
    53: number;
    54: number;
    55: number;
    56: number;
    57: number;
    58: number;
    59: number;
    60: number;
    61: number;
    62: number;
    63: number;
    64: number;
    65: number;
    66: number;
    67: number;
    68: number;
    69: number;
    70: number;
    71: number;
    72: number;
    73: number;
    74: number;
    75: number;
    76: number;
    77: number;
    78: number;
    79: number;
    80: number;
    81: number;
    82: number;
    83: number;
    84: number;
    85: number;
    86: number;
    87: number;
    88: number;
    89: number;
    90: number;
    91: number;
    92: number;
    93: number;
    94: number;
    95: number;
    96: number;
    97: number;
    98: number;
    99: number;
    100: number;
    101: number;
    102: number;
    103: number;
    104: number;
    105: number;
    106: number;
    107: number;
    108: number;
    109: number;
    110: number;
    111: number;
    112: number;
    113: number;
    114: number;
    115: number;
    116: number;
    117: number;
    118: number;
    119: number;
    120: number;
    121: number;
    122: number;
    123: number;
    124: number;
    125: number;
    126: number;
    127: number;
    128: number;
    129: number;
    130: number;
    131: number;
    132: number;
    133: number;
    134: number;
    135: number;
    136: number;
    137: number;
    138: number;
    139: number;
    140: number;
    141: number;
    142: number;
    143: number;
    144: number;
    145: number;
    146: number;
    147: number;
    148: number;
    149: number;
    150: number;
    151: number;
    152: number;
    153: number;
    154: number;
    155: number;
    156: number;
    157: number;
    158: number;
    159: number;
    160: number;
    161: number;
    162: number;
    163: number;
    164: number;
    165: number;
    166: number;
    167: number;
    168: number;
    169: number;
    170: number;
    171: number;
    172: number;
    173: number;
    174: number;
    175: number;
    176: number;
    177: number;
    178: number;
    179: number;
    180: number;
    181: number;
    182: number;
    183: number;
    184: number;
    185: number;
    186: number;
    187: number;
    188: number;
    189: number;
    190: number;
    191: number;
    192: number;
    193: number;
    194: number;
    195: number;
    196: number;
    197: number;
    198: number;
    199: number;
    200: number;
}

export interface CommunityTime {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
    21: number;
    22: number;
    23: number;
    24: number;
    25: number;
    26: number;
    27: number;
    28: number;
    29: number;
    30: number;
    31: number;
    32: number;
    33: number;
    34: number;
    35: number;
    36: number;
    37: number;
    38: number;
    39: number;
    40: number;
    41: number;
    42: number;
    43: number;
    44: number;
    45: number;
    46: number;
    47: number;
    48: number;
    49: number;
    50: number;
    51: number;
    52: number;
    53: number;
    54: number;
    55: number;
    56: number;
    57: number;
    58: number;
    59: number;
    60: number;
    61: number;
    62: number;
    63: number;
    64: number;
    65: number;
    66: number;
    67: number;
    68: number;
    69: number;
    70: number;
    71: number;
    72: number;
    73: number;
    74: number;
    75: number;
    76: number;
    77: number;
    78: number;
    79: number;
    80: number;
    81: number;
    82: number;
    83: number;
    84: number;
    85: number;
    86: number;
    87: number;
    88: number;
    89: number;
    90: number;
    91: number;
    92: number;
    93: number;
    94: number;
    95: number;
    96: number;
    97: number;
    98: number;
    99: number;
    100: number;
    101: number;
    102: number;
    103: number;
    104: number;
    105: number;
    106: number;
    107: number;
    108: number;
    109: number;
    110: number;
    111: number;
    112: number;
    113: number;
    114: number;
    115: number;
    116: number;
    117: number;
    118: number;
    119: number;
    120: number;
    121: number;
    122: number;
    123: number;
    124: number;
    125: number;
    126: number;
    127: number;
    128: number;
    129: number;
    130: number;
    131: number;
    132: number;
    133: number;
    134: number;
    135: number;
    136: number;
    137: number;
    138: number;
    139: number;
    140: number;
    141: number;
    142: number;
    143: number;
    144: number;
    145: number;
    146: number;
    147: number;
    148: number;
    149: number;
    150: number;
    151: number;
    152: number;
    153: number;
    154: number;
    155: number;
    156: number;
    157: number;
    158: number;
    159: number;
    160: number;
    161: number;
    162: number;
    163: number;
    164: number;
    165: number;
    166: number;
    167: number;
    168: number;
    169: number;
    170: number;
    171: number;
    172: number;
    173: number;
    174: number;
    175: number;
    176: number;
    177: number;
    178: number;
    179: number;
    180: number;
    181: number;
    182: number;
    183: number;
    184: number;
    185: number;
    186: number;
    187: number;
    188: number;
    189: number;
    190: number;
    191: number;
    192: number;
    193: number;
    194: number;
    195: number;
    196: number;
    197: number;
    198: number;
    199: number;
    200: number;
}

export interface Traffic {
    communityFall: CommunityFall;
    communityVectorLimit: CommunityVectorLimit;
    communityGen: CommunityGen;
    communityTime: CommunityTime;
}

export interface Moneytype {
    name: string;
    type: string;
    id: number;
}

export interface Buff210 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff410 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff352 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff362 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff372 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff382 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff392 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff402 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff412 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff422 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff432 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff442 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff452 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff462 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff472 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff482 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff502 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff512 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff522 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff532 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff542 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff552 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff562 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff572 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff582 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff592 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff602 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff612 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff622 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buff632 {
    name: string;
    desc: string;
    icon: string;
    field: string;
    object: string;
    hidden: number;
    type: number;
    value: number;
    objectType: number;
    duration: number;
    positive: boolean;
    price: number;
    currency: string;
    id: number;
}

export interface Buffs {
    2: Buff210;
    4: Buff410;
    35: Buff352;
    36: Buff362;
    37: Buff372;
    38: Buff382;
    39: Buff392;
    40: Buff402;
    41: Buff412;
    42: Buff422;
    43: Buff432;
    44: Buff442;
    45: Buff452;
    46: Buff462;
    47: Buff472;
    48: Buff482;
    50: Buff502;
    51: Buff512;
    52: Buff522;
    53: Buff532;
    54: Buff542;
    55: Buff552;
    56: Buff562;
    57: Buff572;
    58: Buff582;
    59: Buff592;
    60: Buff602;
    61: Buff612;
    62: Buff622;
    63: Buff632;
}

export interface Avatarlayer {
    id: number;
    name: string;
}

export interface Avataritem {
    id: number;
    avatarlayerId: number;
    sex: number;
    weight: number;
    num: number;
    level: number;
    priceUsd: number;
    priceBtc: number;
}

export interface Moneypacket {
    id: number;
    name: string;
    android_id: string;
    apple_id: string;
    description: string;
    icon: string;
    currency: string;
    amount: number;
    price_usd: number;
    price_rub: number;
    price_btc?: number;
    discount: number;
    hidden: boolean;
    special: boolean;
}

export interface Education {
    name: string;
    type: number;
    zone: string;
    level: number;
    duration: number;
    price: number;
    currency: string;
    energyVector: number;
    energyValue: number;
    experienceFactor: number;
    id: number;
}

export interface Task2 {
    done: string;
}

export interface Zones {
    frontend: string;
    backend: string;
    design: string;
    marketing: string;
}

export interface Traffic2 {
    done: string;
}

export interface Ad2 {
    done: string;
}

export interface Site2 {
    activated: string;
    limited: string;
    task: Task2;
    zones: Zones;
    traffic: Traffic2;
    ad: Ad2;
}

export interface Education2 {
    done: string;
    done_male: string;
    done_female: string;
}

export interface Vacation {
    done: string;
}

export interface Worker2 {
    fucked: string;
    education: Education2;
    vacation: Vacation;
    levelUp: string;
}

export interface Self {
    levelUp: string;
}

export interface Task3 {
    ended: string;
}

export interface Traffic3 {
    ended: string;
}

export interface Notifications {
    site: Site2;
    worker: Worker2;
    self: Self;
    task: Task3;
    traffic: Traffic3;
}

export interface Ru {
    notifications: Notifications;
}

export interface Lang {
    ru: Ru;
}

export interface TeamWorkerLimit {
    priceUsd: number;
    priceBtc: number;
    level: number;
}

export interface ExtraSlotsPrice {
    price: number;
    currency: string;
}

export interface Design {
    from: number;
    to: number;
}

export interface Frontend {
    from: number;
    to: number;
}

export interface Backend {
    from: number;
    to: number;
}

export interface Marketing {
    from: number;
    to: number;
}

export interface StartSettings {
    design: Design;
    frontend: Frontend;
    backend: Backend;
    marketing: Marketing;
}

export interface Common {
    from: number;
    to: number;
}

export interface Rare {
    from: number;
    to: number;
}

export interface Params {
    common: Common[];
    rare: Rare[];
}

export interface Workers {
    amount: number;
    usualWorkerPersent: number;
    params: Params;
}

export interface Setting {
    level: number;
    price: number;
    currency: string;
    searchDuration: number;
    offerDuration: number;
    title: string;
    workers: Workers;
}

export interface WorkerOfferSettings {
    startOffersCount: number;
    startSlotsCount: number;
    maxLevelForSpecialWorkers: number;
    extraSlotsPrice: ExtraSlotsPrice[];
    startSettings: StartSettings;
    settings: Setting[];
}

export interface WorkerVectorCoef {
    marketing: number;
    frontend: number;
    design: number;
    backend: number;
}

export interface WorkerSpeed {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
    6: number;
    7: number;
    8: number;
    9: number;
    10: number;
    11: number;
    12: number;
    13: number;
    14: number;
    15: number;
    16: number;
    17: number;
    18: number;
    19: number;
    20: number;
    21: number;
    22: number;
    23: number;
    24: number;
    25: number;
    26: number;
    27: number;
    28: number;
    29: number;
    30: number;
    31: number;
    32: number;
    33: number;
    34: number;
    35: number;
    36: number;
    37: number;
    38: number;
    39: number;
    40: number;
    41: number;
    42: number;
    43: number;
    44: number;
    45: number;
    46: number;
    47: number;
    48: number;
    49: number;
    50: number;
    51: number;
    52: number;
    53: number;
    54: number;
    55: number;
    56: number;
    57: number;
    58: number;
    59: number;
    60: number;
    61: number;
    62: number;
    63: number;
    64: number;
    65: number;
    66: number;
    67: number;
    68: number;
    69: number;
    70: number;
    71: number;
    72: number;
    73: number;
    74: number;
    75: number;
    76: number;
    77: number;
    78: number;
    79: number;
    80: number;
    81: number;
    82: number;
    83: number;
    84: number;
    85: number;
    86: number;
    87: number;
    88: number;
    89: number;
    90: number;
    91: number;
    92: number;
    93: number;
    94: number;
    95: number;
    96: number;
    97: number;
    98: number;
    99: number;
    100: number;
    101: number;
    102: number;
    103: number;
    104: number;
    105: number;
    106: number;
    107: number;
    108: number;
    109: number;
    110: number;
    111: number;
    112: number;
    113: number;
    114: number;
    115: number;
    116: number;
    117: number;
    118: number;
    119: number;
    120: number;
    121: number;
    122: number;
    123: number;
    124: number;
    125: number;
    126: number;
    127: number;
    128: number;
    129: number;
    130: number;
    131: number;
    132: number;
    133: number;
    134: number;
    135: number;
    136: number;
    137: number;
    138: number;
    139: number;
    140: number;
    141: number;
    142: number;
    143: number;
    144: number;
    145: number;
    146: number;
    147: number;
    148: number;
    149: number;
    150: number;
    151: number;
    152: number;
    153: number;
    154: number;
    155: number;
    156: number;
    157: number;
    158: number;
    159: number;
    160: number;
    161: number;
    162: number;
    163: number;
    164: number;
    165: number;
    166: number;
    167: number;
    168: number;
    169: number;
    170: number;
    171: number;
    172: number;
    173: number;
    174: number;
    175: number;
    176: number;
    177: number;
    178: number;
    179: number;
    180: number;
    181: number;
    182: number;
    183: number;
    184: number;
    185: number;
    186: number;
    187: number;
    188: number;
    189: number;
    190: number;
    191: number;
    192: number;
    193: number;
    194: number;
    195: number;
    196: number;
    197: number;
    198: number;
    199: number;
    200: number;
}

export interface ExtraSlotsPrice2 {
    price: number;
    currency: string;
}

export interface SearchSetting {
    level: number;
    searchDuration: number;
    price: number;
    currency: string;
    title: string;
    amount: number;
    cpcK: number;
    ctrK: number;
    themeRelationMin: number;
    importunity: number[];
    usualAdPercent: number;
}

export interface AdSettings {
    minimumCtr: number;
    extraSlotsPrice: ExtraSlotsPrice2[];
    searchSettings: SearchSetting[];
    maxAdSlots: number;
}

export interface EducationTypes {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
}

export interface EducationTypeLevel {
    level: number;
    type: string;
}

export interface EnergyTypes {
    1: string;
    2: string;
    3: string;
}

export interface SoftTypes {
    1: string;
    2: string;
    3: string;
}

export interface Type1100 {
    name: string;
    timeFactor: number;
    profitFactor: number;
    id: number;
}

export interface Type211 {
    name: string;
    timeFactor: number;
    profitFactor: number;
    id: number;
}

export interface Type310 {
    name: string;
    timeFactor: number;
    profitFactor: number;
    id: number;
}

export interface Type411 {
    name: string;
    timeFactor: number;
    profitFactor: number;
    id: number;
}

export interface Type510 {
    name: string;
    timeFactor: number;
    profitFactor: number;
    id: number;
}

export interface Type610 {
    name: string;
    timeFactor: number;
    profitFactor: number;
    id: number;
}

export interface Type710 {
    name: string;
    timeFactor: number;
    profitFactor: number;
    id: number;
}

export interface Type810 {
    name: string;
    timeFactor: number;
    profitFactor: number;
    id: number;
}

export interface Types {
    1: Type1100;
    2: Type211;
    3: Type310;
    4: Type411;
    5: Type510;
    6: Type610;
    7: Type710;
    8: Type810;
}

export interface Relation1101 {
    contenttypeId: number;
    contenttypeIdBoost: number;
    id: number;
    sitetypeId: number;
}

export interface Relation212 {
    contenttypeId: number;
    contenttypeIdBoost: number;
    id: number;
    sitetypeId: number;
}

export interface Relation311 {
    contenttypeId: number;
    contenttypeIdBoost: number;
    id: number;
    sitetypeId: number;
}

export interface Relation413 {
    contenttypeId: number;
    contenttypeIdBoost: number;
    id: number;
    sitetypeId: number;
}

export interface Relation511 {
    contenttypeId: number;
    contenttypeIdBoost: number;
    id: number;
    sitetypeId: number;
}

export interface Relation {
    1: Relation1101[];
    2: Relation212[];
    3: Relation311[];
    4: Relation413[];
    5: Relation511[];
}

export interface Content2 {
    types: Types;
    slotsLimit: number;
    relation: Relation;
    repeatStep: number;
    matchStep: number;
}

export interface Wt {
}

export interface Tutorial {
    wt: Wt;
}

export interface Button {
}

export interface Usd {
    button: Button;
}

export interface Button2 {
    0: number;
    1: number;
}

export interface Btc {
    button: Button2;
}

export interface Reward2 {
    usd: Usd;
    btc: Btc;
}

export interface ExtraSlotsPrice3 {
    price: number;
    currency: string;
}

export interface Kf {
    min: number;
    max: number;
}

export interface SearchSetting2 {
    level: number;
    searchDuration: number;
    price: number;
    currency: string;
    offerDuration: number;
    title: string;
    probability: number;
    penalty: number;
    priceKf: number;
    kf: Kf;
}

export interface Contract {
    startSlotsCount: number;
    maxSlotsCount: number;
    maxFakeStage: number;
    bargainKf: number;
    btcPenaltyKf: number;
    buttonCount: number;
    reward: Reward2;
    extraSlotsPrice: ExtraSlotsPrice3[];
    searchSettings: SearchSetting2[];
    maxSlotsAll: number;
    minLevel: number;
}

export interface Quest2 {
    tutorial: Tutorial;
    contract: Contract;
}

export interface Link {
    maxSeoLinks: number;
    maxSpamLinks: number;
    minSeoLevel: number;
    minSpamLevel: number;
    spamAnno: number;
    maxWeight: number;
    maxComments: number;
    spamCoef: number;
}

export interface SettingsKey {
    key: string;
    level: number;
    group: string;
}

export interface AdvancePaymentDuration {
    hosting: number;
    domain: number;
    worker: number;
}

export interface PaymentNotificationDuration {
    hosting: number;
    domain: number;
}

export interface Value2 {
    value: number;
    educationType?: number;
    count?: number;
    energyType?: number;
    searchSettings?: number;
    buffId?: number;
    autoversionType?: number;
    autocontentType?: number;
}

export interface Questreward {
    type: number;
    value: Value2;
    id: number;
    icon: string;
}

export interface Questrewardtype {
    SELF_EXP: number;
    WORKER_CV: number;
    USD: number;
    BTC: number;
    EDUCATION: number;
    ENERGY: number;
    BUFF_SITE: number;
    BUFF_WORKER: number;
    VERSION: number;
    CONTENT: number;
    DDOS_PROTECTION: number;
    DDOS_ATTACK: number;
}

export interface Site3 {
    duration: number;
    price: number;
    currency: string;
    minLevel: number;
}

export interface Worker3 {
    duration: number;
    price: number;
    currency: string;
    minLevel: number;
}

export interface Accountant {
    site: Site3;
    worker: Worker3;
}

export interface Robots {
}

export interface MilestonesConfig {
    minLevel: number;
    maxLevel: number;
    id: number;
}

export interface Epoch {
    min: number;
    max: number;
    id: number;
}

export type Years = Record<number, number>;

export interface Rating {
    ratingsUpdateTime: number;
    sitesPerPage: number;
    bufferSize: number;
}

export interface KfParam2 {
    priceBtc: number;
    minLevel: number;
}

export interface Fee {
    amount: number;
    currency: string;
}

export interface Prize {
    amount: number;
    currency: string;
}

export interface Types21102 {
    name: string;
    targetType: number;
    fee: Fee;
    duration: number;
    prize: Prize[];
}

export interface Fee2 {
    amount: number;
    currency: string;
}

export interface Prize2 {
    amount: number;
    currency: string;
}

export interface Types2213 {
    name: string;
    targetType: number;
    fee: Fee2;
    duration: number;
    prize: Prize2[];
}

export interface Fee3 {
    amount: number;
    currency: string;
}

export interface Prize3 {
    amount: number;
    currency: string;
}

export interface Types2312 {
    name: string;
    targetType: number;
    fee: Fee3;
    duration: number;
    prize: Prize3[];
}

export interface Types2 {
    1: Types21102;
    2: Types2213;
    3: Types2312;
}

export interface Tender {
    minLevel: number;
    beforeStartTime: number;
    usersCount: number;
    types: Types2;
}

export interface ContactType {
    WHITE: number;
    BLACK: number;
    REQUEST: number;
}

export interface Attack {
    minLevel: number;
}

export interface SiteOptions {
    dailyBonus: DailyBonus;
    themes: Theme[];
    types: Type[];
    enginetypes: Enginetype[];
    engines: Engine[];
    hostings: Hosting[];
    tasktypes: Tasktype[];
    domainzones: Domainzone[];
    time: number;
    traffic: Traffic;
    moneytypes: Moneytype[];
    btcexchangerate: number;
    buffs: Buffs;
    avatarlayer: Avatarlayer[];
    avataritem: Avataritem[];
    moneypacket: Moneypacket[];
    education: Education[];
    lang: Lang;
    teamWorkerLimit: TeamWorkerLimit[];
    workerOfferSettings: WorkerOfferSettings;
    workerVectorCoef: WorkerVectorCoef;
    workerSpeed: WorkerSpeed;
    adSettings: AdSettings;
    educationTypes: EducationTypes;
    educationTypeLevel: EducationTypeLevel[];
    energyTypes: EnergyTypes;
    softTypes: SoftTypes;
    content: Content2;
    quest: Quest2;
    link: Link;
    settingsKeys: SettingsKey[];
    advancePaymentDuration: AdvancePaymentDuration;
    domainOnePayment: number;
    paymentNotificationDuration: PaymentNotificationDuration;
    questreward: Questreward[];
    questrewardtype: Questrewardtype;
    accountant: Accountant;
    robots: Robots;
    milestonesConfig: MilestonesConfig[];
    epoch: Epoch[];
    years: Years;
    rating: Rating;
    kfParam: KfParam2;
    tender: Tender;
    contactType: ContactType;
    attack: Attack;
}

export interface Settings {
    locale: string;
    emailAlreadyVerified: string;
    workerAvatar: string;
    sitesFilterBy: string;
}

export interface GlobalMessage {
    id: string;
    fromPersonId: string;
    text: string;
    date: number;
    avatar: number[];
    username: string;
}

export interface LinksExchangeMessage {
    id: string;
    fromPersonId: string;
    text: string;
    date: number;
    avatar: number[];
    username: string;
}

export interface ItTalksMessage {
    id: string;
    fromPersonId: string;
    text: string;
    date: number;
    avatar: number[];
    username: string;
}

export interface Chats {
    globalMessages: GlobalMessage[];
    linksExchangeMessages: LinksExchangeMessage[];
    itTalksMessages: ItTalksMessage[];
}

export interface Tender2 {
    type: number;
}

export interface Data {
    zone: string;
    scope: string;
}


export interface ShadoWs {
    target: string;
    value: ValueItem[];
}
export interface ValueItem {
    target: string;
    action: string;
    id?: string;
    value: any;
}
export interface Value {
    status?: number;
    slots?: number;
    endTime?: number;
    startTime?: number;
    data?: Data;
    id: string;
    personId?: string;
    siteId?: string;
    tasktypeId?: number;
    time?: number;
    year?: number;
    md?: number;
}
export interface Data {
    searchType: number;
}


export interface Sitespeed {
    communityValue: number;
    communityVector: number;
    genericValue: number;
    genericVector: number;
    speedRatioValue: number;
    speedRatioVector: number;
    retention: number;
    frontRatio: number;
    limit: number;
    anno: number;
    ts: number;
    limited: boolean;
    linkValue: number;
    linkVector: number;
    ddosValue: number;
    id: string;
    siteId: string;
    personId: string;
    level: number;
}

export interface Data2 {
    zone: string;
    scope: string;
}

export interface Value2 {
    status: number;
    updateSkill: boolean;
    updateEnergy: boolean;
    md: number;
    frontendVector: number;
    frontendValue: number;
    frontendTs: number;
    energyValue: number;
    energyVector: number;
    energyTs: number;
    time?: number;
    year?: number;
    money?: number;
    ctrBase?: number;
    startDate?: number;
    siteId: string;
    balanceUsd?: number;
    balanceBtc?: number;
    profitAdded?: boolean;
    usdFlag?: number;
    btcFlag?: number;
    update?: boolean;
    sitespeed: Sitespeed;
    personId: string;
    slots?: number;
    endTime?: number;
    startTime?: number;
    data: Data2;
    id: string;
    tasktypeId?: number;
    zone: string;
    scope: string;
    workers: string[];
}

export interface Value {
    target: string;
    action: string;
    id: string;
    value: Value2;
}

export interface ShadoWs {
    target: string;
    value: ValueItem[];
}

export interface InitResponse {
    person: Person;
    workers: Worker[];
    sites: Site[];
    extraSites: Site[];
    extraAds: Ad[];
    educationMarket: EducationMarket;
    energyMarket: EnergyMarket;
    gadgetMarket: GadgetMarket;
    softMarket: SoftMarket;
    attackMarket: AttackMarket;
    notifications: Notification[];
    quest: Quest;
    refCode: string;
    referrals: any[];
    tasks: Task[];
    workerOffers: any[];
    siteOptions: SiteOptions;
    settings: Settings;
    chats: Chats;
    tenders: Tender2[];
    serverTime: number;
    version: string;
}

export interface CancelTaskResponse {
    ok: boolean;
    serverTime: number;
    version: string;
    shadoWs: ShadoWs;
}

export interface AddWorkerResponse {
    status: number;
    slots: number;
    endTime: number;
    startTime: number;
    data: Data;
    id: string;
    personId: string;
    siteId: string;
    tasktypeId: number;
    serverTime: number;
    version: string;
    shadoWs: ShadoWs;
}

export interface Limit {
    frontend: number;
    backend: number;
    design: number;
    marketing: number;
}
export interface SitespeedItem {
    communityValue: number;
    communityVector: number;
    genericValue: number;
    genericVector: number;
    speedRatioValue: number;
    speedRatioVector: number;
    retention: number;
    frontRatio: number;
    limit: number;
    anno: number;
    ts: number;
    limited: boolean;
    linkValue: number;
    linkVector: number;
    ddosValue: number;
    id: string;
    siteId: string;
    personId: string;
    money: number;
}
export interface ShadoWs {
    target: string;
    value: ValueItem[];
}
export interface ValueItem {
    target: string;
    action: string;
    id?: string;
    value: any;
}
export interface Value {
    hostingId?: number;
    hostingPaidTill?: null;
    sitetypeId?: number;
    sitethemeId?: number;
    created?: number;
    deletedAt?: number;
    anno?: number;
    domainTill?: null;
    status?: number;
    highlight?: boolean;
    debt?: number;
    debtBtc?: number;
    level?: number;
    backend?: number;
    backendValue?: number;
    backendTs?: number;
    backendVector?: number;
    frontend?: number;
    frontendValue?: number;
    frontendTs?: number;
    frontendVector?: number;
    design?: number;
    designValue?: number;
    designTs?: number;
    designVector?: number;
    marketingValue?: number;
    marketingTs?: number;
    marketingVector?: number;
    linkWeight?: number;
    extraAdSlots?: number;
    autocontentStartTime?: number;
    autocontentEndTime?: number;
    autoversionStartTime?: number;
    autoversionEndTime?: number;
    md?: number;
    purchasedHostings?: null;
    id: string;
    personId?: string;
    engineId?: number;
    domainId?: string;
    domain?: string;
    domainzoneId?: number;
    marketing?: number;
    btcPayment?: boolean;
    domainStatus?: number;
    limit?: Limit;
    sitespeed?: [];
    ad?: any[];
    traffic?: any[];
    buffs?: any[];
    content?: any[];
    links?: any[];
    adSlots?: number;
    kfParam?: KfParam;
    time?: number;
    year?: number;
}

export interface Sitespeed {
    communityValue: number;
    communityVector: number;
    genericValue: number;
    genericVector: number;
    speedRatioValue: number;
    speedRatioVector: number;
    retention: number;
    frontRatio: number;
    limit: number;
    anno: number;
    ts: number;
    limited: boolean;
    linkValue: number;
    linkVector: number;
    ddosValue: number;
    id: string;
    siteId: string;
    personId: string;
}

export interface CreateSiteResponse {
    hostingId: number;
    hostingPaidTill: null;
    sitetypeId: number;
    sitethemeId: number;
    created: number;
    deletedAt: number;
    anno: number;
    domainTill: null;
    status: number;
    highlight: boolean;
    debt: number;
    debtBtc: number;
    level: number;
    backend: number;
    backendValue: number;
    backendTs: number;
    backendVector: number;
    frontend: number;
    frontendValue: number;
    frontendTs: number;
    frontendVector: number;
    design: number;
    designValue: number;
    designTs: number;
    designVector: number;
    marketingValue: number;
    marketingTs: number;
    marketingVector: number;
    linkWeight: number;
    extraAdSlots: number;
    autocontentStartTime: number;
    autocontentEndTime: number;
    autoversionStartTime: number;
    autoversionEndTime: number;
    md: number;
    purchasedHostings: null;
    id: string;
    personId: string;
    engineId: number;
    domainId: string;
    domain: string;
    domainzoneId: number;
    marketing: number;
    btcPayment: boolean;
    domainStatus: number;
    limit: Limit;
    sitespeed: SitespeedItem[];
    serverTime: number;
    version: string;
    shadoWs: ShadoWs;
}

export interface LevelUpSiteResponse {
    ok: boolean;
    serverTime: number;
    version: string;
    shadoWs: ShadoWs;
}

export interface FindAdResponse {
    ok: boolean;
    serverTime: number;
    version: string;
    shadoWs: ShadoWs;
}
