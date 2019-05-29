function moneyHelperFactory(e, t, n) {
  var r = 'function' === typeof Symbol && 'symbol' === typeof Symbol.iterator ? function(e) {
      return typeof e;
    }
    : function(e) {
      return e && 'function' === typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? 'symbol' : typeof e;
    }
    , i = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[ t ];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[ r ] = n[ r ]);
    }
    return e;
  }
    , o = function(e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++)
        n[ t ] = e[ t ];
      return n;
    }
    return Array.from(e);
  }
    , a = function(e) {
    return 'object' === ('undefined' === typeof e ? 'undefined' : r(e)) && !Array.isArray(e) && null !== e;
  }
    , s = !/^prod/.test('production')
    , u = function(e, t?, n?) {
    var t = arguments.length > 1 && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : 0
      , n = arguments.length > 2 && void 0 !== arguments[ 2 ] ? arguments[ 2 ] : 1;
    return Math.min(Math.max(e, t), n);
  }
    , c = function(e, t, n) {
    n = arguments.length > 2 && void 0 !== arguments[ 2 ] ? arguments[ 2 ] : Date.now();
    if (s) {
      if (!Number.isFinite(e)) {
        throw new Error('value is not a number in createVector');
      }
      if (!Number.isFinite(t)) {
        throw new Error('vector is not a number in createVector');
      }
      if (!Number.isFinite(n)) {
        throw new Error('ts is not a number in createVector');
      }
    }
    return {
      vector: t,
      value: e,
      ts: n
    };
  }
    , l = function(e, i?) {
    var t = e.value
      , n = e.vector
      , r = e.ts
      , i = arguments.length > 1 && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : Date.now();
    if (s) {
      if (!Number.isFinite(t)) {
        throw new Error('value is not a number in calculateVector');
      }
      if (!Number.isFinite(n)) {
        throw new Error('vector is not a number in calculateVector');
      }
      if (!Number.isFinite(r)) {
        throw new Error('ts is not a number in calculateVector');
      }
      if (!Number.isFinite(i)) {
        throw new Error('toTs is not a number in calculateVector');
      }
      if (i < r) {
        throw new Error('toTs is less than vector.ts in calculateVector');
      }
    }
    var o = 36e5
      , a = (i - r) / o;
    return t + n * a;
  }
    , d = function(e) {
    var t = e.value
      , n = e.vector
      , r = e.ts
      , i = arguments.length > 1 && void 0 !== arguments[ 1 ] ? arguments[ 1 ] : Date.now();
    if (s) {
      if (!Number.isFinite(t)) {
        throw new Error('value is not a number in calculateVectorSum');
      }
      if (!Number.isFinite(n)) {
        throw new Error('vector is not a number in calculateVectorSum');
      }
      if (!Number.isFinite(r)) {
        throw new Error('ts is not a number in calculateVectorSum');
      }
      if (!Number.isFinite(i)) {
        throw new Error('toTs is not a number in calculateVectorSum');
      }
      if (i < r) {
        throw new Error('toTs is less than vector.ts in calculateVectorSum');
      }
    }
    var o = 36e5
      , a = (i - r) / o;
    return t * a + n * Math.pow(a, 2) / 2;
  }
    , f = function(e, t, n, r?) {
    r = arguments.length > 3 && void 0 !== arguments[ 3 ] ? arguments[ 3 ] : Date.now();
    if (s) {
      if (!Number.isFinite(e)) {
        throw new Error('value is not a number in calcVectorFinishTime');
      }
      if (!Number.isFinite(t)) {
        throw new Error('targetValue is not a number in calcVectorFinishTime');
      }
      if (!Number.isFinite(n)) {
        throw new Error('vector is not a number in calcVectorFinishTime');
      }
      if (!Number.isFinite(r)) {
        throw new Error('startTime is not a number in calcVectorFinishTime');
      }
      if (0 === n) {
        throw new Error('vector is zero in calcVectorFinishTime');
      }
      if (n < 0 && e < t) {
        throw new Error('vector has the wrong direction in calcVectorFinishTime');
      }
      if (n > 0 && e > t) {
        throw new Error('vector has the wrong direction in calcVectorFinishTime');
      }
    }
    var i = 36e5;
    return r + Math.ceil(i * (t - e) / n);
  }
    , h = function(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[ 2 ] ? arguments[ 2 ] : Date.now();
    if (s) {
      if (e < 0) {
        throw new Error('duration has the wrong negative number in calcEndPrice');
      }
      if (t < 0) {
        throw new Error('endTime has the wrong negative number in calcEndPrice');
      }
      if (n < 0) {
        throw new Error('ts has the wrong negative number in calcEndPrice');
      }
      if (!Number.isFinite(e)) {
        throw new Error('duration is not a number in calcEndPrice');
      }
      if (!Number.isFinite(t)) {
        throw new Error('endTime is not a number in calcEndPrice');
      }
      if (!Number.isFinite(n)) {
        throw new Error('ts is not a number in calcEndPrice');
      }
    }
    var r = u(t - n, 0, e);
    return 0 === r ? 0 : 0 < r && r <= 300 ? Math.max(
      Math.ceil(1 * (r - 0) / 300 + 0),
      1
    ) : 300 < r && r <= 3600 ? Math.max(
      Math.ceil(4 * (r - 300) / 3300 + 1),
      1
    ) : 3600 < r && r <= 86400 ? Math.max(Math.ceil(45 * (r - 3600) / 82800 + 5), 1) : Math.max(
      Math.ceil(Math.pow(Math.ceil(r / 35), .5)),
      1
    );
  }
    , p = {
    createVector: c,
    calculateVector: l,
    calculateVectorSum: d,
    calcVectorFinishTime: f,
    calcEndPrice: h
  }
    , m = function(e, t) {
    var n = e.ctrBase
      , r = e.ctrVector
      , i = e.startDate;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('ctrBase is not a number in calcCurrentCTR');
      }
      if (!Number.isFinite(r)) {
        throw new Error('ctrVector is not a number in calcCurrentCTR');
      }
      if (!Number.isFinite(i)) {
        throw new Error('startDate is not a number in calcCurrentCTR');
      }
      if (!Number.isFinite(t)) {
        throw new Error('ts is not a number in calcCurrentCTR');
      }
      if (t < i) {
        throw new Error('ts is less than ad.startDate in calcCurrentCTR');
      }
    }
    return Math.max(0, l(c(n, r, 1e3 * i), t));
  }
    , _ = function(e, t) {
    var n = e.speedRatioValue
      , r = e.speedRatioVector
      , i = e.ts;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('speedRatioValue is not a number in calcConversion');
      }
      if (!Number.isFinite(r)) {
        throw new Error('speedRatioVector is not a number in calcConversion');
      }
      if (!Number.isFinite(i)) {
        throw new Error('ts is not a number in calcConversion');
      }
      if (!Number.isFinite(t)) {
        throw new Error('toTs is not a number in calcConversion');
      }
      if (t < i) {
        throw new Error('toTs is less than speed.ts in calcConversion');
      }
    }
    return Math.max(0, l(c(n, r, i), t));
  }
    , v = function(e, t) {
    if (s) {
      if (!a(e)) {
        throw new Error('speed is not a object in calcMoneyVector');
      }
      if (!Number.isFinite(t)) {
        throw new Error('ts is not a number in calcMoneyVector');
      }
      if (t < e.ts) {
        throw new Error('ts is less than speed.ts in calcMoneyVector');
      }
    }
    var n = e.genericVector
      , r = e.communityVector
      , i = e.linkVector
      , o = e.speedRatioVector
      , u = P(e, t)
      , c = _(e, t)
      , l = n + r + i
      , d = -o > c ? -c : o
      , f = V(e)
      , h = u == f ? 0 : l;
    h = -h > u ? -u : h;
    var p = u * d + c * h + h * d
      , m = u * c;
    return -p > m ? -m : p;
  }
    , y = function(e, t) {
    if (s) {
      if (!a(e)) {
        throw new Error('speed is not a object in calcMoneySpeed');
      }
      if (!Number.isFinite(t)) {
        throw new Error('ts is not a number in calcMoneySpeed');
      }
      if (t < e.ts) {
        throw new Error('ts is less than speed.ts in calcMoneySpeed');
      }
    }
    return P(e, t) * _(e, t);
  }
    , g = function(e, t, n) {
    if (s) {
      if (!a(e)) {
        throw new Error('speed is not an object in calcMoneySpeedOne');
      }
      if (!a(t)) {
        throw new Error('ad is not a object in calcMoneySpeedOne');
      }
      if (!Number.isFinite(n)) {
        throw new Error('ts is not a number in calcMoneySpeedOne');
      }
      if (n < e.ts) {
        throw new Error('ts is less than speed.ts in calcMoneySpeedOne');
      }
    }
    var r = i({}, e, k(t, e));
    return y(r, n);
  }
    , b = function e(t, n) {
    if (s) {
      if (!a(t)) {
        throw new Error('speed is not an object in calcMoneyAmount');
      }
      if (!Number.isFinite(n)) {
        throw new Error('toTs is not a number in calcMoneyAmount');
      }
      if (n < t.ts) {
        throw new Error('toTs less then speed ts in calcMoneyAmount');
      }
    }
    if (t.ts === n) {
      return 0;
    }
    var r = t.speedRatioVector
      , i = t.speedRatioValue
      , u = t.ts
      , c = t.communityVector
      , l = t.communityValue
      , d = t.genericVector
      , h = t.genericValue
      , p = t.linkValue
      , m = t.linkVector
      , _ = V(t)
      , v = []
      , y = 0;
    if (r < 0 && v.push(f(i, 0, r, u)),
    c < 0 && v.push(f(l, 0, c, u)),
    d < 0 && v.push(f(h, 0, d, u)),
    m < 0 && v.push(f(p, 0, m, u)),
    _ > 0) {
      var g = j({
        genericSpeed: h,
        communitySpeed: l,
        linkSpeed: p
      })
        , b = d + c + m;
      b < 0 && g > _ && v.push(f(g, _, b, u));
    }
    var w = Math.min.apply(Math, o(v.filter(function(e) {
      return e < n && e > t.ts;
    })).concat([ n ]))
      , M = (w - u) / 1e3 / 60 / 60
      , L = P(t, u)
      , k = P(t, w)
      , T = (k - L) / M;
    return w < n && (y += e(N(t, w), n)),
    y + Math.pow(M, 2) * (T * i + L * r) / 2 + Math.pow(M, 3) * T * r / 3 + M * i * L;
  }
    , w = function(e, t, n) {
    if (s) {
      if (!a(e)) {
        throw new Error('speed is not an object in calcMoneyAmountOne');
      }
      if (!a(t)) {
        throw new Error('ad is not a object in calcMoneyAmountOne');
      }
      if (!Number.isFinite(n)) {
        throw new Error('ts is not a number in calcMoneyAmountOne');
      }
      if (n < e.ts) {
        throw new Error('toTs is less than speed.ts in calcMoneyAmountOne');
      }
    }
    var r = i({}, e, k(t, e));
    return b(r, n);
  }
    , M = function(e) {
    if (s) {
      if (!Number.isFinite(e)) {
        throw new Error('anno is not a number in calcAnnoRatio');
      }
      if (e < 0 || e > 100) {
        throw new Error('anno is not in range 0...100 in calcAnnoRatio');
      }
    }
    return u(1 - e / 100, 0, 1);
  }
    , L = function(e, t) {
    var n = t.anno;
    if (s) {
      if (!Array.isArray(e)) {
        throw new Error('adList is not an array in calcSpeedRatio');
      }
      if (!Number.isFinite(n)) {
        throw new Error('anno is not a number in calcSpeedRatio');
      }
    }
    var r = M(n);
    return e.reduce(function(e, t) {
      var n = t.ctrBase
        , i = t.ctrVector
        , o = t.cpc;
      if (s) {
        if (!Number.isFinite(n)) {
          throw new Error('ctrBase is not a number in calcSpeedRatio');
        }
        if (!Number.isFinite(i)) {
          throw new Error('ctrVector is not a number in calcSpeedRatio');
        }
        if (!Number.isFinite(o)) {
          throw new Error('cpc is not a number in calcSpeedRatio');
        }
        if (n < 0) {
          throw new Error('ctrBase < 0 in calcSpeedRatio');
        }
        if (o < 0) {
          throw new Error('cpc < 0 in calcSpeedRatio');
        }
      }
      return e.speedRatioValue += r * n / 100 * o / 1e3,
        e.speedRatioVector += r * i / 100 * o / 1e3,
        e;
    }, {
      speedRatioValue: 0,
      speedRatioVector: 0
    });
  }
    , k = function(e, t) {
    var n = e.ctrBase
      , r = e.ctrVector
      , i = e.cpc
      , o = t.anno;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('ctrBase is not a number in calcSpeedRatioOne');
      }
      if (!Number.isFinite(r)) {
        throw new Error('ctrVector is not a number in calcSpeedRatioOne');
      }
      if (!Number.isFinite(i)) {
        throw new Error('cpc is not a number in calcSpeedRatioOne');
      }
      if (!Number.isFinite(o)) {
        throw new Error('anno is not a number in calcSpeedRatioOne');
      }
      if (n < 0) {
        throw new Error('ctrBase < 0 in calcSpeedRatioOne');
      }
      if (i < 0) {
        throw new Error('cpc < 0 in calcSpeedRatioOne');
      }
    }
    var a = M(o);
    return {
      speedRatioValue: a * n / 100 * i / 1e3,
      speedRatioVector: a * r / 100 * i / 1e3
    };
  }
    , T = function(e, t) {
    var n = e.speedRatioValue
      , r = e.speedRatioVector
      , i = e.ts;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('speedRatioValue is not a number in calcSpeedRatioVector');
      }
      if (!Number.isFinite(r)) {
        throw new Error('speedRatioVector is not a number in calcSpeedRatioVector');
      }
      if (!Number.isFinite(i)) {
        throw new Error('ts is not a number in calcSpeedRatioVector');
      }
      if (!Number.isFinite(t)) {
        throw new Error('toTs is not a number in calcSpeedRatioVector');
      }
      if (n < 0) {
        throw new Error('speedRatioValue is less than 0 in calcSpeedRatioVector');
      }
      if (t < i) {
        throw new Error('toTs is less than speed.ts in calcSpeedRatioVector');
      }
    }
    return Math.max(0, l(c(n, r, i), t));
  }
    , Y = function(e, t, n) {
    return U(e, t, n, 'money', b);
  }
    , D = {
    calcCurrentCTR: m,
    calcConversion: _,
    calcMoneyVector: v,
    calcMoneySpeed: y,
    calcMoneySpeedOne: g,
    calcMoneyAmount: b,
    calcMoneyAmountOne: w,
    calcAnnoRatio: M,
    calcSpeedRatio: L,
    calcSpeedRatioOne: k,
    calcSpeedRatioVector: T,
    calcTimeMoney: Y
  }
    , S = function(e, t) {
    var n = e.communityValue
      , r = e.communityVector
      , i = e.ts;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('communityValue is not a number in calcCommunityTraffic');
      }
      if (!Number.isFinite(r)) {
        throw new Error('communityVector is not a number in calcCommunityTraffic');
      }
      if (!Number.isFinite(i)) {
        throw new Error('ts is not a number in calcCommunityTraffic');
      }
      if (!Number.isFinite(t)) {
        throw new Error('toTs is not a number in calcCommunityTraffic');
      }
      if (n < 0) {
        throw new Error('communityValue is less than 0 in calcCommunityTraffic');
      }
      if (t < i) {
        throw new Error('toTs is less than vector.ts in calcCommunityTraffic');
      }
    }
    return Math.max(0, l(c(n, r, i), t));
  }
    , x = function(e, t) {
    var n = e.genericValue
      , r = e.genericVector
      , i = e.frontRatio
      , o = e.ts;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('genericValue is not a number in calcGenericTraffic');
      }
      if (!Number.isFinite(r)) {
        throw new Error('genericVector is not a number in calcGenericTraffic');
      }
      if (!Number.isFinite(o)) {
        throw new Error('ts is not a number in calcGenericTraffic');
      }
      if (!Number.isFinite(i)) {
        throw new Error('frontRatio is not a number in calcGenericTraffic');
      }
      if (!Number.isFinite(t)) {
        throw new Error('toTs is not a number in calcGenericTraffic');
      }
      if (n < 0) {
        throw new Error('genericValue is less than 0 in calcGenericTraffic');
      }
      if (i < 0) {
        throw new Error('frontRatio is less than 0 in calcGenericTraffic');
      }
      if (t < o) {
        throw new Error('toTs is less than vector.ts in calcGenericTraffic');
      }
    }
    return E({
      genericValue: n,
      genericVector: r,
      ts: o
    }, t) * i;
  }
    , E = function(e, t) {
    var n = e.genericValue
      , r = e.genericVector
      , i = e.ts;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('genericValue is not a number in calcGenericValue');
      }
      if (!Number.isFinite(r)) {
        throw new Error('genericVector is not a number in calcGenericValue');
      }
      if (!Number.isFinite(i)) {
        throw new Error('ts is not a number in calcGenericValue');
      }
      if (!Number.isFinite(t)) {
        throw new Error('toTs is not a number in calcGenericValue');
      }
      if (n < 0) {
        throw new Error('genericValue is less than 0 in calcGenericValue');
      }
      if (t < i) {
        throw new Error('toTs is less than vector.ts in calcGenericValue');
      }
    }
    return Math.max(0, l(c(n, r, i), t));
  }
    , O = function(e, t) {
    var n = e.linkValue
      , r = e.linkVector
      , i = e.ts;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('linkValue is not a number in calcLinkTraffic');
      }
      if (!Number.isFinite(r)) {
        throw new Error('linkVector is not a number in calcLinkTraffic');
      }
      if (!Number.isFinite(i)) {
        throw new Error('ts is not a number in calcLinkTraffic');
      }
      if (!Number.isFinite(t)) {
        throw new Error('toTs is not a number in calcLinkTraffic');
      }
      if (n < 0) {
        throw new Error('genericValue is less than 0 in calcLinkTraffic');
      }
      if (t < i) {
        throw new Error('toTs is less than vector.ts in calcLinkTraffic');
      }
    }
    return Math.max(0, l(c(n, r, i), t));
  }
    , A = function(e) {
    var t = e.ddosValue;
    if (s) {
      if (!Number.isFinite(t)) {
        throw new Error('ddosValue is not a number in calcDdosTraffic');
      }
      if (t > 0) {
        throw new Error('ddosValue is greater than 0 in calcDdosTraffic');
      }
    }
    return Math.min(0, t);
  }
    , j = function(e) {
    var t = e.communitySpeed
      , n = e.genericSpeed
      , r = e.linkSpeed;
    if (s) {
      if (!Number.isFinite(t)) {
        throw new Error('communitySpeed is not a number in summTraffSpeed');
      }
      if (!Number.isFinite(n)) {
        throw new Error('genericSpeed is not a number in summTraffSpeed');
      }
      if (!Number.isFinite(r)) {
        throw new Error('linkSpeed is not a number in summTraffSpeed');
      }
      if (t < 0) {
        throw new Error('communitySpeed is less than 0 in summTraffSpeed');
      }
      if (n < 0) {
        throw new Error('genericSpeed is less than 0 in summTraffSpeed');
      }
      if (r < 0) {
        throw new Error('linkSpeed is less than 0 in summTraffSpeed');
      }
    }
    return t + n + r;
  }
    , H = function(e, t) {
    e.limit;
    var n = e.ts;
    if (s) {
      if (!a(e)) {
        throw new Error('speed is not an object in getLimitedTrafInfo');
      }
      if (!Number.isFinite(t)) {
        throw new Error('toTs is not a number in getLimitedTrafInfo');
      }
      if (n < e.ts) {
        throw new Error('ts is less than speed.ts in getLimitedTrafInfo');
      }
    }
    var r = x(e, t)
      , o = S(e, t)
      , u = O(e, t)
      , c = A(e)
      , l = j({
      communitySpeed: o,
      genericSpeed: r,
      linkSpeed: u
    })
      , d = V(i({}, e, {
      ddosValue: c
    }));
    if (l > d) {
      var f = Math.floor(d * o / l)
        , h = Math.floor(d * u / l)
        , p = d - f - h;
      return {
        totalSpeed: d,
        genericSpeed: p,
        communitySpeed: f,
        linkSpeed: h,
        ddosSpeed: c
      };
    }
    return {
      totalSpeed: l,
      genericSpeed: r,
      communitySpeed: o,
      linkSpeed: u,
      ddosSpeed: c
    };
  }
    , P = function(e, t) {
    if (s) {
      if (!a(e)) {
        throw new Error('speed is not an object in calcLimitedTrafSumm');
      }
      if (!Number.isFinite(t)) {
        throw new Error('toTs is not a number in calcLimitedTrafSumm');
      }
      if (t < e.ts) {
        throw new Error('ts is less than speed.ts in calcLimitedTrafSumm');
      }
    }
    var n = x(e, t)
      , r = S(e, t)
      , o = O(e, t)
      , u = A(e)
      , c = j({
      communitySpeed: r,
      genericSpeed: n,
      linkSpeed: o
    })
      , l = V(i({}, e, {
      ddosValue: u
    }));
    return Math.min(l, c);
  }
    , I = function(e) {
    var t = e.maxBw
      , n = e.backend
      , r = e.sumVersionScoreAll;
    if (s) {
      if (!Number.isFinite(t)) {
        throw new Error('maxBw is not a number in calcLimit');
      }
      if (!Number.isFinite(n)) {
        throw new Error('backend is not a number in calcLimit');
      }
      if (t < 0) {
        throw new Error('maxBw is less than 0 in calcLimit');
      }
      if (n < 0) {
        throw new Error('backend is less than 0 in calcLimit');
      }
    }
    var i = 0 === r ? 1 : Math.round(100 * Math.max(.5, Math.min(1.5, Math.pow(n / r * 100 / 33, .3)))) / 100;
    return t * i;
  }
    , C = function(e, t) {
    if (s) {
      if (!Array.isArray(e)) {
        throw new Error('speeds is not an array in findNearDot');
      }
      if (!e.length) {
        throw new Error('speeds is empty in findNearDot');
      }
      if (!Number.isFinite(t)) {
        throw new Error('ts is not a number in findNearDot');
      }
      if (t < e[ 0 ].ts) {
        throw new Error('ts less than first speed ts in findNearDot');
      }
    }
    for (var n = e[ 0 ], r = 0; r < e.length; r++) {
      if (s && !Number.isFinite(e[ r ].ts)) {
        throw new Error('ts is not a number in findNearDot');
      }
      if (e[ r ].ts > t) {
        return n;
      }
      n = e[ r ];
    }
    return n;
  }
    , N = function(e, t) {
    if (s) {
      if (!a(e)) {
        throw new Error('prevDot is not an object in calcDot');
      }
      if (!Number.isFinite(e.genericValue)) {
        throw new Error('genericValue is not a number in calcDot');
      }
      if (!Number.isFinite(e.genericVector)) {
        throw new Error('genericVector is not a number in calcDot');
      }
      if (!Number.isFinite(e.communityValue)) {
        throw new Error('communityValue is not a number in calcDot');
      }
      if (!Number.isFinite(e.communityVector)) {
        throw new Error('communityVector is not a number in calcDot');
      }
      if (!Number.isFinite(e.speedRatioValue)) {
        throw new Error('speedRatioValue is not a number in calcDot');
      }
      if (!Number.isFinite(e.speedRatioVector)) {
        throw new Error('speedRatioVector is not a number in calcDot');
      }
      if (!Number.isFinite(e.linkValue)) {
        throw new Error('linkValue is not a number in calcDot');
      }
      if (!Number.isFinite(e.linkVector)) {
        throw new Error('linkVector is not a number in calcDot');
      }
      if (!Number.isFinite(e.frontRatio)) {
        throw new Error('frontRatio is not a number in calcDot');
      }
      if (!Number.isFinite(e.ts)) {
        throw new Error('prevDot.ts is not a number in calcDot');
      }
      if (!Number.isFinite(t)) {
        throw new Error('ts is not a number in calcDot');
      }
      if (t < e.ts) {
        throw new Error('ts is less than prevDot.ts in calcDot');
      }
      if (e.genericValue < 0) {
        throw new Error('genericValue is less than 0 in calcDot');
      }
      if (e.communityValue < 0) {
        throw new Error('communityValue is less than 0 in calcDot');
      }
      if (e.speedRatioValue < 0) {
        throw new Error('speedRatioValue is less than 0 in calcDot');
      }
      if (e.frontRatio < 0) {
        throw new Error('frontRatio is less than 0 in calcDot');
      }
      if (e.linkValue < 0) {
        throw new Error('linkValue is less than 0 in calcDot');
      }
    }
    if (t === e.ts) {
      return e;
    }
    var n = S(e, t)
      , r = E(e, t)
      , o = O(e, t)
      , u = T(e, t)
      , c = n > 0 ? e.communityVector : 0
      , l = r > 0 ? e.genericVector : 0
      , d = o > 0 ? e.linkVector : 0
      , f = u > 0 ? e.speedRatioVector : 0;
    return i({}, e, {
      communityValue: n,
      linkValue: o,
      linkVector: d,
      genericValue: r,
      speedRatioValue: u,
      communityVector: c,
      genericVector: l,
      speedRatioVector: f,
      ts: t
    });
  }
    , R = function(e, t) {
    var n = arguments.length > 2 && void 0 !== arguments[ 2 ] ? arguments[ 2 ] : Date.now();
    if (s) {
      if (!Array.isArray(e)) {
        throw new Error('speeds is not an array in cleanSiteSpeeds');
      }
      if (!e.length) {
        throw new Error('speeds is empty in cleanSiteSpeeds');
      }
      if (!t) {
        throw new Error('moment is not defined in cleanSiteSpeeds');
      }
      if (!Number.isFinite(n)) {
        throw new Error('nowTs is not a number in cleanSiteSpeeds');
      }
    }
    var r = e[ 0 ].ts
      , o = +t(n).subtract(24, 'hours').startOf('hour')
      , a = +t(r).add(1, 'hour').startOf('hour')
      , u = Math.max(o, a)
      , c = 36e5
      , l = []
      , d = e[ 0 ];
    r >= o && l.push(i({}, e[ 0 ], {
      money: 0,
      traffic: 0
    }));
    for (var f = u; f < n; f += c) {
      var h = C(e, f)
        , p = Math.max(r, f - c)
        , m = Y(e, p, f)
        , _ = B(e, p, f);
      d = N(h, f),
        l.push(i({}, d, {
          money: m,
          traffic: _
        }));
    }
    var v = C(e, n);
    return l.push(i({}, N(v, n), {
      money: Y(e, d.ts, n),
      traffic: B(e, d.ts, n)
    })),
      l;
  }
    , F = function(e) {
    var t = e.level
      , n = e.frontend
      , r = e.anno
      , i = e.sumVersionScoreAll;
    if (s) {
      if (!Number.isFinite(t)) {
        throw new Error('genericValue is not a number in calcRetention');
      }
      if (!Number.isFinite(n)) {
        throw new Error('frontend is not a number in calcRetention');
      }
      if (!Number.isFinite(r)) {
        throw new Error('anno is not a number in calcRetention');
      }
      if (!Number.isFinite(i)) {
        throw new Error('sumVersionScoreAll is not a number in calcRetention');
      }
      if (t < 0) {
        throw new Error('level is less than 0 in calcRetention');
      }
      if (n < 0) {
        throw new Error('frontend is less than 0 in calcRetention');
      }
      if (i < 0) {
        throw new Error('sumVersionScoreAll is less than 0 in calcRetention');
      }
      if (r < 0 || r > 100) {
        throw new Error('anno is not in range 0...100 in calcRetention');
      }
      if (n > i) {
        throw new Error('all scores is less than frontend in calcRetention');
      }
    }
    if (0 === t) {
      return 0;
    }
    var o = M(r);
    return Math.round(2 * t * n / i * o * 1e3) / 1e3;
  }
    , W = function(e) {
    var t = e.frontend
      , n = e.sumVersionScoreAll;
    if (s) {
      if (!Number.isFinite(n)) {
        throw new Error('sumVersionScoreAll is not a number in calcFrontRatio');
      }
      if (!Number.isFinite(t)) {
        throw new Error('frontend is not a number in calcFrontRatio');
      }
      if (t < 1) {
        throw new Error('frontend is less than 1 in calcFrontRatio');
      }
      if (n < 1) {
        throw new Error('sumVersionScoreAll is less than 1 in calcFrontRatio');
      }
      if (t >= n) {
        throw new Error('all scores is less than frontend in calcFrontRatio');
      }
    }
    return Math.round(100 * Math.max(.5, Math.min(1.5, Math.pow(t / n * 100 / 33, .3)))) / 100;
  }
    , $ = function(e) {
    var t = e.level
      , n = e.sumVersionScoreAll;
    if (s) {
      if (!Number.isFinite(t)) {
        throw new Error('level is not a number in calcGeneric');
      }
      if (!Number.isFinite(n)) {
        throw new Error('sumVersionScoreAll is not a number in calcGeneric');
      }
      if (t < 0) {
        throw new Error('level is less than 0 in calcGeneric');
      }
      if (n < 0) {
        throw new Error('sumVersionScoreAll is less than 0 in calcGeneric');
      }
    }
    if (0 === t) {
      return 0;
    }
    var r = 1.5 * (t + Math.pow(t, 2)) * 100 + 500
      , i = Math.floor((.5 * (100 * Math.pow(n, .75) / t + r) + 2100) / 15);
    return Math.max(0, Math.round(100 * i) / 100);
  }
    , V = function(e) {
    var t = e.limit
      , n = e.ddosValue;
    if (s) {
      if (!Number.isFinite(t)) {
        throw new Error('limit is not a number in calcDdosTrafficLimit');
      }
      if (!Number.isFinite(n)) {
        throw new Error('ddosValue is not a number in calcDdosTrafficLimit');
      }
      if (t < 0) {
        throw new Error('limit is less than 0 in calcDdosTrafficLimit');
      }
      if (n > 0) {
        throw new Error('ddosValue is greater than 0 in calcDdosTrafficLimit');
      }
    }
    return Math.max(0, t + n);
  }
    , z = function e(t, n) {
    if (s) {
      if (!a(t)) {
        throw new Error('speed is not an object in calcTrafficAmount');
      }
      if (!Number.isFinite(n)) {
        throw new Error('toTs is not a number in calcTrafficAmount');
      }
      if (n < t.ts) {
        throw new Error('toTs less then speed ts in calcTrafficAmount');
      }
    }
    if (t.ts === n) {
      return 0;
    }
    var r = t.ts
      , i = t.communityVector
      , u = t.communityValue
      , c = t.genericVector
      , l = t.genericValue
      , d = t.linkValue
      , h = t.linkVector
      , p = V(t)
      , m = []
      , _ = 0;
    if (i < 0 && m.push(f(u, 0, i, r)),
    c < 0 && m.push(f(l, 0, c, r)),
    h < 0 && m.push(f(d, 0, h, r)),
    p > 0) {
      var v = j({
        genericSpeed: l,
        communitySpeed: u,
        linkSpeed: d
      })
        , y = c + i + h;
      y < 0 && v > p && m.push(f(v, p, y, r))
    }
    var g = Math.min.apply(Math, o(m.filter(function(e) {
      return e < n && e > t.ts
    })).concat([ n ]))
      , b = (g - r) / 1e3 / 60 / 60
      , w = P(t, r)
      , M = P(t, g);
    return g < n && (_ += e(N(t, g), n)),
    _ + b * (M + w) / 2
  }
    , U = function(e, t, n, r, i) {
    if (s) {
      if (!Array.isArray(e)) {
        throw new Error("speeds is not an array in calcTimeData");
      }
      if (!e.length) {
        throw new Error("speeds is empty in calcTimeData");
      }
      if (!Number.isFinite(t)) {
        throw new Error("startTs is not a number in calcTimeData");
      }
      if (!Number.isFinite(n)) {
        throw new Error("endTs is not a number in calcTimeData");
      }
      if ("string" !== typeof r) {
        throw new Error("field is not a string in calcTimeData");
      }
      if (t > n) {
        throw new Error("endTs is less than startTs in calcTimeData")
      }
    }
    for (var o = e.length - 1, a = 0; a < e.length; a++)
      if (e[ a ].ts > t) {
        o = Math.max(0, a - 1);
        break
      }
    for (var u = 0, c = o; c < e.length && e[ c ].ts < n; c++) {
      var l = e[ c ];
      e[ c ].ts < t && (l = N(e[ c ], t));
      var d = e[ c + 1 ] ? e[ c + 1 ].ts : n
        , f = e[ c + 1 ];
      f && Number.isFinite(f[ r ]) ? u += f[ r ] : u += i(l, Math.min(d, n))
    }
    return u
  }
    , B = function(e, t, n) {
    return U(e, t, n, "traffic", z)
  }
    , G = {
    calcCommunityTraffic: S,
    calcGenericTraffic: x,
    calcGenericValue: E,
    calcLinkTraffic: O,
    calcDdosTraffic: A,
    summTraffSpeed: j,
    getLimitedTrafInfo: H,
    calcLimitedTrafSumm: P,
    calcLimit: I,
    findNearDot: C,
    calcDot: N,
    cleanSiteSpeeds: R,
    calcRetention: F,
    calcFrontRatio: W,
    calcGeneric: $,
    calcDdosTrafficLimit: V,
    calcTrafficAmount: z,
    calcTimeData: U,
    calcTimeTraffic: B
  }
    , J = {
    Traffic: G,
    Vector: p,
    Money: D
  };
  e.exports = J
};

var forExports = { exports: null };
moneyHelperFactory(forExports, null, null);
export const Helpers = forExports.exports;

//
// const site: any = {
//   "ad": [
//     {
//       "cpc": 42500,
//       "ctrBase": 1.537309352038361,
//       "ctrVector": -0.014
//     }
//   ],
//   "sitespeed": [
//     {
//       "communityValue": 589.0509833333334,
//       "communityVector": -15,
//       "genericValue": 5172,
//       "genericVector": 0,
//       "frontRatio": 0.99,
//       "limit": 25250,
//       "anno": 40,
//       "ts": 1558175872448,
//       "linkValue": 8964,
//       "linkVector": 0,
//       "ddosValue": 0
//     }
//   ]
// };
//
// const profit = '57,5 $';
// const ad = site.ad[0];
//
// function formatMoney(e) {
//   const money = e >= 100 ? Math.floor(e) : e;
//   return parseFloat(money.toFixed(2));
// }
//
// function adData(site: Site, ad: Ad) {
//   const [ lastSpeed ] = site.sitespeed.reverse();
//   const bS = new Date().getTime();
//   var moneyEarned = ad.money
//     , ctrBase = ad.ctrBase
//     , ctrVector = ad.ctrVector
//     , startDate = ad.startDate
//     , cpc = ad.cpc
//     , moneyEarned = moneyEarned || 0
//     , r = {
//     profitTotal: Math.max(formatMoney(moneyEarned / 100)),
//     profitPerHour: 0,
//     conversion: 0
//   };
//
//   var o = {
//     ctrBase: ctrBase,
//     ctrVector: ctrVector,
//     startDate: startDate,
//     cpc: cpc
//   };
//   var c = Helpers.Money.calcMoneyAmountOne(lastSpeed, o, Math.max(bS, lastSpeed.ts));
//   let result = {
//     profitTotal: Math.max(formatMoney((moneyEarned + c) / 100), 0),
//     profitPerHour: formatMoney(Helpers.Money.calcMoneySpeedOne(lastSpeed, o, bS) / 100),
//     conversion: Helpers.Money.calcCurrentCTR(o, Math.max(bS, 1e3 * startDate)) * Helpers.Money.calcAnnoRatio(lastSpeed.anno)
//   };
//   return result;
// };
//
// const stats = adData(site, ad);
//
// console.log(stats.profitPerHour)
