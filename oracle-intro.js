(function () {
  'use strict';

  // Stylized, simplified star patterns for each sign's constellation, not
  // an astronomically precise star chart, drawn as original line art for
  // the card illustration. Coordinates sit in a 0-100 x 0-70 viewBox.
  var CONSTELLATIONS = {
    Aries: { stars: [[15,45],[35,30],[55,20],[72,32]], lines: [[0,1],[1,2],[2,3]] },
    Taurus: { stars: [[10,50],[28,32],[46,20],[64,30],[82,18],[46,50]], lines: [[0,1],[1,2],[2,3],[3,4],[2,5]] },
    Gemini: { stars: [[20,10],[22,32],[18,55],[46,8],[49,30],[45,55]], lines: [[0,1],[1,2],[3,4],[4,5],[1,4]] },
    Cancer: { stars: [[30,15],[45,30],[58,18],[45,48]], lines: [[0,1],[1,2],[1,3]] },
    Leo: { stars: [[15,18],[22,36],[34,50],[50,55],[68,46],[82,30],[70,22]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[4,6]] },
    Virgo: { stars: [[10,18],[26,32],[46,22],[62,42],[48,60],[80,50]], lines: [[0,1],[1,2],[2,3],[3,4],[3,5]] },
    Libra: { stars: [[45,10],[20,38],[70,38],[20,60],[70,60]], lines: [[0,1],[0,2],[1,3],[2,4],[1,2]] },
    Scorpio: { stars: [[8,25],[24,28],[40,38],[55,48],[68,60],[78,72],[85,58]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] },
    Sagittarius: { stars: [[12,68],[70,20],[20,58],[24,72],[60,22],[68,8]], lines: [[0,1],[0,2],[0,3],[1,4],[1,5]] },
    Capricorn: { stars: [[15,20],[32,15],[50,25],[62,42],[55,60],[35,65],[20,50]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,0]] },
    Aquarius: { stars: [[8,30],[24,42],[38,28],[54,40],[68,26],[84,38]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5]] },
    Pisces: { stars: [[10,15],[22,28],[18,45],[50,50],[82,45],[86,28],[74,15]], lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]] }
  };

  function constellationSVG(sign) {
    var c = CONSTELLATIONS[sign];
    var lines = c.lines.map(function (pair) {
      var a = c.stars[pair[0]], b = c.stars[pair[1]];
      return '<line class="const-line" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '" />';
    }).join('');
    var stars = c.stars.map(function (p, i) {
      var r = i === 0 ? 2.1 : 1.4;
      return '<circle class="const-star" cx="' + p[0] + '" cy="' + p[1] + '" r="' + r + '" />';
    }).join('');
    return '<svg class="card-constellation" viewBox="0 0 100 70">' + lines + stars + '</svg>';
  }

  // Shared decorative frame, redrawn per card since currentColor/var()
  // needs to resolve inside each element's own SVG.
  var CARD_FRAME =
    '<svg class="card-frame" viewBox="0 0 150 238" preserveAspectRatio="none">' +
      '<rect class="frame-outer" x="5" y="5" width="140" height="228" rx="11" />' +
      '<rect class="frame-inner" x="10" y="10" width="130" height="218" rx="8" />' +
      '<path class="frame-tick" d="M5,24 L5,5 L24,5" />' +
      '<path class="frame-tick" d="M126,5 L145,5 L145,24" />' +
      '<path class="frame-tick" d="M145,214 L145,233 L126,233" />' +
      '<path class="frame-tick" d="M24,233 L5,233 L5,214" />' +
    '</svg>';

  var ZODIAC = [
    {
      sign: 'Aries', glyph: '\u2648', dates: 'Mar 21 \u2013 Apr 19', arcana: 'Arcana I',
      pairing: 'Candied grapes. Jewel-bright and a little unexpected, same as you.',
      readings: [
        'The first move is yours today. Take it before the doubt catches up.',
        'Something you started weeks ago finally gets a straight answer. Trust it.',
        'You want to win. Fine, but check who else is at the table first.',
        'A short fuse serves you well this afternoon. Use it on purpose.'
      ]
    },
    {
      sign: 'Taurus', glyph: '\u2649', dates: 'Apr 20 \u2013 May 20', arcana: 'Arcana II',
      pairing: 'Decadent chocolate. Rich, unhurried, exactly your speed.',
      readings: [
        'Slow down. The good stuff was never going to rush for you anyway.',
        'Someone tests your patience before noon. You have more than they think.',
        'Comfort is not a consolation prize today. Choose it on purpose.',
        'A stubborn streak pays off if you aim it at the right problem.'
      ]
    },
    {
      sign: 'Gemini', glyph: '\u264A', dates: 'May 21 \u2013 Jun 20', arcana: 'Arcana III',
      pairing: 'Custom cookies. Made to whatever spec you are feeling today.',
      readings: [
        'Two conversations pull you in different directions. Let both finish.',
        'Your curiosity finds something worth repeating to a friend tonight.',
        'The plan changes twice before dinner. You are built for that.',
        'Say less than you know today. It lands better.'
      ]
    },
    {
      sign: 'Cancer', glyph: '\u264B', dates: 'Jun 21 \u2013 Jul 22', arcana: 'Arcana IV',
      pairing: 'Dipped strawberries. Sweet, familiar, made to be shared.',
      readings: [
        'Someone needs you to check in first. You already knew that.',
        'Home feels like the right answer to a question you have not asked yet.',
        'An old memory shows up uninvited. Let it stay for a minute.',
        'You give more than you ask for today. Take something back.'
      ]
    },
    {
      sign: 'Leo', glyph: '\u264C', dates: 'Jul 23 \u2013 Aug 22', arcana: 'Arcana V',
      pairing: 'Decadent chocolate. Nothing subtle about it, and neither are you.',
      readings: [
        'The room notices you before you say a word. Use that.',
        'A compliment lands harder than you expect. Let it in.',
        'Someone else gets the spotlight this once. You will get yours by dinner.',
        'You are right about more than usual today. Say it plainly.'
      ]
    },
    {
      sign: 'Virgo', glyph: '\u264D', dates: 'Aug 23 \u2013 Sep 22', arcana: 'Arcana VI',
      pairing: 'Custom cookies. Built to the detail, the way you like things.',
      readings: [
        'The small fix you have been putting off takes four minutes. Do it now.',
        'Someone praises the part you almost skipped. Notice what that tells you.',
        'A plan needs less polish than you think. Send it.',
        'You catch the mistake before anyone else does. Say something kind about it.'
      ]
    },
    {
      sign: 'Libra', glyph: '\u264E', dates: 'Sep 23 \u2013 Oct 22', arcana: 'Arcana VII',
      pairing: 'Dipped strawberries. Balanced, a little elegant, easy to love.',
      readings: [
        'A decision waits on you longer than it should. Pick either door.',
        'Someone wants your opinion more than your agreement today.',
        'Balance shows up as a good trade, not a compromise.',
        'You notice what is missing in a room before anyone else. Add it.'
      ]
    },
    {
      sign: 'Scorpio', glyph: '\u264F', dates: 'Oct 23 \u2013 Nov 21', arcana: 'Arcana VIII',
      pairing: 'Decadent chocolate. Dark, deep, not for the faint of heart.',
      readings: [
        'Something hidden surfaces today. You already suspected it.',
        'A quiet question gets you further than a loud one.',
        'Trust the read you had on someone three weeks ago.',
        'You want the whole truth. You will get most of it by evening.'
      ]
    },
    {
      sign: 'Sagittarius', glyph: '\u2650', dates: 'Nov 22 \u2013 Dec 21', arcana: 'Arcana IX',
      pairing: 'Candied grapes. A surprise crunch for someone who likes surprises.',
      readings: [
        'A plan you made on a whim turns out to be the right one.',
        'Someone invites you somewhere you did not expect. Go.',
        'You say the honest thing and it does not cost you anything.',
        'The long way turns out to be the interesting way today.'
      ]
    },
    {
      sign: 'Capricorn', glyph: '\u2651', dates: 'Dec 22 \u2013 Jan 19', arcana: 'Arcana X',
      pairing: 'Custom cookies. Made to order, no wasted motion.',
      readings: [
        'The work you did quietly last month gets noticed today.',
        'Someone asks for a shortcut. You know there is not one, and you are right.',
        'A goal moves closer without the grand gesture you were planning.',
        'You earn the rest you take tonight. Take it.'
      ]
    },
    {
      sign: 'Aquarius', glyph: '\u2652', dates: 'Jan 20 \u2013 Feb 18', arcana: 'Arcana XI',
      pairing: 'Candied grapes. Nobody else is ordering this, which is the point.',
      readings: [
        'An idea that sounded strange last week makes sense to someone else today.',
        'You solve a problem sideways while everyone else pushes straight ahead.',
        'A friend needs the unconventional advice only you would give.',
        'Something ordinary bores you today. Change one thing about it.'
      ]
    },
    {
      sign: 'Pisces', glyph: '\u2653', dates: 'Feb 19 \u2013 Mar 20', arcana: 'Arcana XII',
      pairing: 'Dipped strawberries. Soft, a little dreamy, entirely on theme.',
      readings: [
        'A feeling you could not name yesterday has words today.',
        'Someone needs you to listen more than to fix anything.',
        'You notice the detail everyone else missed. Keep it to yourself for now.',
        'A daydream turns into an actual plan if you write it down.'
      ]
    }
  ];

  var fan = document.getElementById('cardFan');
  var scrim = document.getElementById('readingScrim');
  var panel = document.getElementById('readingPanel');
  var closeBtn = document.getElementById('readingClose');
  var againBtn = document.getElementById('readingAgain');
  var lastFocusedCard = null;

  // Build the cards.
  var mid = (ZODIAC.length - 1) / 2;
  ZODIAC.forEach(function (z, i) {
    var angle = (i - mid) * 5; // -27.5deg to 27.5deg across 12 cards
    var card = document.createElement('button');
    card.type = 'button';
    card.className = 'tarot-card';
    card.style.setProperty('--angle', angle + 'deg');
    card.setAttribute('data-index', i);
    card.setAttribute('aria-label', 'Reveal today\'s reading for ' + z.sign);

    var inner = document.createElement('span');
    inner.className = 'card-inner';
    inner.innerHTML =
      '<span class="card-back">' +
        '<span class="back-lines"></span>' +
        '<span class="back-icon">✦</span>' +
        '<span class="back-title">Chocolate Oracle</span>' +
      '</span>' +
      '<span class="card-face">' +
        CARD_FRAME +
        '<span class="card-number">' + z.arcana + '</span>' +
        '<span class="card-illustration">' + constellationSVG(z.sign) + '</span>' +
        '<span class="card-glyph" aria-hidden="true">' + z.glyph + '</span>' +
        '<h3>' + z.sign + '</h3>' +
        '<span class="zodiac-dates">' + z.dates + '</span>' +
      '</span>';

    card.appendChild(inner);
    card.addEventListener('click', function (e) { drawCard(z, card, e); });
    fan.appendChild(card);
  });

  // Deal the fan in shortly after load.
  window.requestAnimationFrame(function () {
    setTimeout(function () { fan.classList.add('in-fan'); }, 120);
  });

  // Pick a reading that rotates daily but stays put for the whole day.
  function todaysReading(z, signIndex) {
    var dayIndex = Math.floor(Date.now() / 86400000);
    var pick = (dayIndex + signIndex * 3) % z.readings.length;
    return z.readings[pick];
  }

  function spawnSparks(x, y) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (var i = 0; i < 8; i++) {
      var s = document.createElement('span');
      s.className = 'spark';
      var angle = (Math.PI * 2 * i) / 8;
      var dist = 34 + Math.random() * 18;
      s.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
      s.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
      s.style.left = x + 'px';
      s.style.top = y + 'px';
      document.body.appendChild(s);
      /* eslint-disable-next-line no-loop-func */
      setTimeout(function (el) { return function () { el.remove(); }; }(s), 650);
    }
  }

  function resetChosenCards() {
    var chosen = fan.querySelectorAll('.tarot-card.chosen, .tarot-card.revealed');
    chosen.forEach(function (card) {
      card.classList.remove('chosen');
      card.classList.remove('revealed');
    });
  }

  function drawCard(z, cardEl, evt) {
    var rect = cardEl.getBoundingClientRect();
    spawnSparks(rect.left + rect.width / 2, rect.top + rect.height / 3);

    resetChosenCards();
    cardEl.classList.remove('chosen');
    cardEl.classList.add('revealed');
    // restart animation
    void cardEl.offsetWidth;
    cardEl.classList.add('chosen');

    lastFocusedCard = cardEl;
    var signIndex = ZODIAC.indexOf(z);

    setTimeout(function () {
      document.getElementById('readingArcana').textContent = z.arcana;
      document.getElementById('readingGlyph').textContent = z.glyph;
      document.getElementById('readingSign').textContent = z.sign;
      document.getElementById('readingDates').textContent = z.dates;
      document.getElementById('readingText').textContent = todaysReading(z, signIndex);
      document.getElementById('readingPairing').textContent = z.pairing;
      openPanel();
    }, 320);
  }

  function openPanel() {
    scrim.classList.add('open');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closePanel() {
    scrim.classList.remove('open');
    document.body.style.overflow = '';
    resetChosenCards();
    if (lastFocusedCard) lastFocusedCard.focus();
  }

  closeBtn.addEventListener('click', closePanel);
  againBtn.addEventListener('click', closePanel);
  scrim.addEventListener('click', function (e) {
    if (e.target === scrim) closePanel();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && scrim.classList.contains('open')) closePanel();
  });
})();
