/* Pixel glassware. Each shape is a grid of characters, one per pixel:
     #  the glass itself
     o  what is in it
     .  nothing
   Drawn as plain rects with crisp edges, so it stays pixel art at any size. */
var GLASS = {
 shot: [
  '#........#',
  '#........#',
  '#........#',
  '#........#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '##########'],

 tumbler: [
  '#..........#',
  '#..........#',
  '#..........#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '############'],

 highball: [
  '#........#',
  '#........#',
  '#........#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '##########'],

 pint: [
  '#............#',
  '#............#',
  '#............#',
  '#oooooooooooo#',
  '#oooooooooooo#',
  '.#oooooooooo#.',
  '.#oooooooooo#.',
  '.#oooooooooo#.',
  '.#oooooooooo#.',
  '..#oooooooo#..',
  '..#oooooooo#..',
  '..#oooooooo#..',
  '..#oooooooo#..',
  '...#oooooo#...',
  '...#oooooo#...',
  '...########...'],

 stein: [
  '#..........#....',
  '#..........#....',
  '#..........#....',
  '#oooooooooo#....',
  '#oooooooooo#####',
  '#oooooooooo#...#',
  '#oooooooooo#...#',
  '#oooooooooo#...#',
  '#oooooooooo#...#',
  '#oooooooooo#####',
  '#oooooooooo#....',
  '#oooooooooo#....',
  '#oooooooooo#....',
  '############....'],

 wineglass: [
  '#............#',
  '#............#',
  '#oooooooooooo#',
  '#oooooooooooo#',
  '#oooooooooooo#',
  '.#oooooooooo#.',
  '.#oooooooooo#.',
  '..#oooooooo#..',
  '...#oooooo#...',
  '....#oooo#....',
  '.....####.....',
  '......##......',
  '......##......',
  '......##......',
  '......##......',
  '......##......',
  '..##########..'],

 coupe: [
  '#..............#',
  '#oooooooooooooo#',
  '.#oooooooooooo#.',
  '..#oooooooooo#..',
  '...#oooooooo#...',
  '....########....',
  '.......##.......',
  '.......##.......',
  '.......##.......',
  '.......##.......',
  '...##########...'],

 flute: [
  '#........#',
  '#........#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '.#oooooo#.',
  '.#oooooo#.',
  '..#oooo#..',
  '...####...',
  '....##....',
  '....##....',
  '....##....',
  '....##....',
  '....##....',
  '.########.'],

 bottle: [
  '....##....',
  '....##....',
  '...#oo#...',
  '...#oo#...',
  '..#oooo#..',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.########.'],

 winebottle: [
  '....##....',
  '....##....',
  '...#oo#...',
  '...#oo#...',
  '...#oo#...',
  '...#oo#...',
  '..#oooo#..',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.#oooooo#.',
  '.########.'],

 /* Tulipano: narrow flared rim over a wide belly. The small Italian beer. */
 tulip: [
  '##......##',
  '.#......#.',
  '.#oooooo#.',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '#oooooooo#',
  '.#oooooo#.',
  '.#oooooo#.',
  '..#oooo#..',
  '..######..'],

 /* Bicchiere alto: straight-sided, thin and tall. Lager and porter. */
 tall: [
  '#......#',
  '#......#',
  '#oooooo#',
  '#oooooo#',
  '#oooooo#',
  '#oooooo#',
  '#oooooo#',
  '#oooooo#',
  '#oooooo#',
  '#oooooo#',
  '#oooooo#',
  '#oooooo#',
  '########'],

 /* Pinta nonick: straight British pint with the bulge below the rim that keeps
    stacked glasses from locking together. */
 nonic: [
  '.#........#.',
  '#oooooooooo#',
  '#oooooooooo#',
  '.#oooooooo#.',
  '.#oooooooo#.',
  '.#oooooooo#.',
  '.#oooooooo#.',
  '.#oooooooo#.',
  '.#oooooooo#.',
  '.#oooooooo#.',
  '.#oooooooo#.',
  '.##########.'],

 carafe: [
  '....####....',
  '....#..#....',
  '....#..#....',
  '...######...',
  '..#oooooo#..',
  '.#oooooooo#.',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '#oooooooooo#',
  '############']
};

/* Which glass each serving is drunk from, and how big to draw it.
   The number is the pixel size, chosen so the drawn glass grows with the volume:
   the inked area — every pixel actually painted, glass and liquid together —
   goes as volume^(2/3), normalised inside each category. Inked area rather than
   liquid, because the eye compares whole objects: a bottle has to look bigger
   than a pint even though a third of it is neck. And rather than the bounding
   box, because a stein's handle encloses mostly air. */
var GLASSMAP = {
 beer:     [['tulip',2.3125],['bottle',2.5],['tall',2.9375],['pint',2.375],['stein',2.5],['nonic',3.1875],['bottle',4],['stein',3.25]],
 wine:     [['wineglass',1.5625],['wineglass',1.6875],['wineglass',1.875],['carafe',2.375],['winebottle',3.5]],
 spark:    [['flute',1.5625],['flute',1.8125],['winebottle',3.5]],
 spirit:   [['shot',4,4],['shot',4,5],['shot',4,7],['shot',4,9]],
 cocktail: [['coupe',2.25],['tumbler',2.375],['tumbler',2.5625],['highball',2.8125],['highball',3.125]]
};
var CATGLASS = {beer:'stein', wine:'wineglass', spark:'flute', spirit:'shot', cocktail:'coupe'};

/* A shot glass is one object: what changes is how far it is poured.
   level is how many of its ten rows hold liquid. */
function shotGrid(level){
  var g = [], n = 10;
  /* the top row stays glass, so a full measure still reads as a glass */
  for (var y = 0; y < n; y++) g.push('#' + ((y > 0 && (n - y) <= level) ? 'oooooooo' : '........') + '#');
  g.push('##########');
  return g;
}

/* px: the size of one pixel. fill: what is in the glass. */
function glassSVG(shape, px, fill, edge, level){
  var g = (shape === 'shot' && level) ? shotGrid(level) : GLASS[shape];
  if (!g) return '';
  var w = g[0].length, h = g.length, r = '';
  for (var y = 0; y < h; y++){
    var row = g[y], run = 0, ch = '';
    for (var x = 0; x <= w; x++){
      var c = (x < w) ? row.charAt(x) : '\0';
      if (c === ch && c !== '\0'){ run++; continue; }
      if (run && ch !== '.'){
        r += '<rect x="' + (x - run) + '" y="' + y + '" width="' + run + '" height="1" fill="'
           + (ch === 'o' ? fill : edge) + '"/>';
      }
      ch = c; run = 1;
    }
  }
  return '<svg width="' + (w*px) + '" height="' + (h*px) + '" viewBox="0 0 ' + w + ' ' + h
       + '" shape-rendering="crispEdges" aria-hidden="true" focusable="false">' + r + '</svg>';
}
