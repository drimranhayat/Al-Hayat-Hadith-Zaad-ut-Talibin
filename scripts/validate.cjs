const fs=require('fs'),vm=require('vm'),path=require('path'),assert=require('assert');const base=path.join(__dirname,'..');let c={window:{}};
for(let f of ['data.js','rules.js','palette.js'])vm.runInNewContext(fs.readFileSync(path.join(base,f),'utf8'),c);
const H=c.window.HADITHS;assert.equal(H.length,64);let words=0,qa=0,quiz=0;
for(let [i,h]of H.entries()){
 assert.equal(h.id,i+1);assert(h.page>=18&&h.page<=288);assert(c.window.GRAMMAR_RULES[h.rule]);
 for(let k of ['title','arabic','translation','explanation','example','focusQ','focusA','source','section'])assert(h[k]?.trim(),`${h.id}: ${k}`);
 assert.equal(h.arabic,h.words.map(w=>w.ar).join(' '));
 for(let w of h.words){for(let k of ['ar','ur','en','grammar','type'])assert(w[k]?.trim());assert(/[\u064B-\u0652]/.test(w.ar),`${h.id}: ${w.ar}`);words++}
 assert.equal(h.qa.length,8);assert.equal(new Set(h.qa.map(q=>q.q)).size,8);qa+=h.qa.length;
 assert.equal(h.quiz.length,6);for(let q of h.quiz){assert(q.q&&q.why);assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert(q.answer>=0&&q.answer<4);quiz++}
 assert.equal(h.phrases.length,2);assert(h.goals.length===3);assert(h.excerpt===true||h.excerpt===false);
}
assert.equal(words,446);assert.equal(qa,512);assert.equal(quiz,384);
assert.equal(new Set(c.window.LESSON_COLORS.slice(0,H.length).map(x=>x.accent)).size,H.length);
for(let f of ['index.html','app.js','style.css','assets/fonts/Amiri-Regular.woff2','assets/fonts/JameelNooriNastaleeq.woff2'])assert(fs.existsSync(path.join(base,f)));
console.log(`PASS: ${H.length} selected lessons; ${words} annotated words; ${qa} short Q&A; ${quiz} MCQs; all source pages, grammar rules, local assets and lesson colors valid.`);
// Editorial regression checks: theme-specific stems, synchronized syntax and no old boilerplate.
const themeQuestions=H.flatMap(h=>h.qa.slice(0,4).map(q=>q.q));
assert.equal(new Set(themeQuestions).size,256);
for(const h of H){
 for(const w of h.words)assert(h.syntax.includes(w.ar+' — '+w.grammar),`Stale syntax: ${h.id}`);
 assert.equal(h.quiz[0].q,h.qa[3].q);
 assert.equal(h.quiz[5].q,h.qa[2].q);
 assert.equal(h.quiz[5].options[h.quiz[5].answer],h.example);
}
const publicCopy=['data.js','app.js','rules.js'].map(f=>fs.readFileSync(path.join(base,f),'utf8')).join('\n');
for(const phrase of ['یہ ابتدائی تدریسی تجزیہ ہے','اس عبارت کا آسان اردو مفہوم کیا ہے','اس سبق کی تعلیم کی ایک عملی مثال کیا ہے','اس صورت کو اپنی زندگی سے جوڑیں','اس سبق کی نسبت اور مقام کتاب میں کہاں ہے','بغیر تحقیق ہر دعویٰ درست مان لینا چاہیے'])assert(!publicCopy.includes(phrase),phrase);
console.log('PASS: 256 distinct thematic questions; 64 contextual practical MCQs; synchronized syntax; prohibited boilerplate absent.');
