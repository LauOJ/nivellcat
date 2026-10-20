const QUESTIONS = {
    c1: [
        {
            prompt: "—Has tornat el llibre a la Marta?\n—Sí, ja ___ he tornat.",
            options: ["li", "l'hi", "la hi"],
            answer: 1,
            explanation: "«El llibre» (complement directe, «el») i «a la Marta» (complement indirecte, «li») es combinen en «el hi», que davant de vocal s'apostrofa: «l'hi he tornat». També és correcte «li l'he tornat»."
        },
        {
            prompt: "Quan surtis, pensa ___ comprar el pa.",
            options: ["en", "a", "de"],
            answer: 1,
            explanation: "«Pensar a» + infinitiu vol dir 'recordar-se de fer una cosa'. «Pensar en» vol dir 'tenir algú o alguna cosa al pensament': «Penso en tu»."
        },
        {
            prompt: "___ pressupost, encara no tenim les xifres definitives.",
            options: ["En quant al", "En quan al", "Quant al"],
            answer: 2,
            explanation: "«En quant a» és un calc del castellà «en cuanto a». Les formes correctes són «quant a» i «pel que fa a»: «Quant al pressupost…» o «Pel que fa al pressupost…»."
        },
        {
            prompt: "Quan ___ a casa, truca'm.",
            options: ["arribis", "arribaràs", "arribes"],
            answer: 0,
            explanation: "Les oracions temporals que es refereixen al futur porten el verb en subjuntiu: «quan arribis», «quan acabis». «Quan arribaràs» és un error freqüent."
        },
        {
            prompt: "Què vol dir «enllestir» a la frase «Hem d'enllestir l'informe abans de divendres»?",
            options: ["Revisar", "Acabar", "Començar"],
            answer: 1,
            explanation: "«Enllestir» vol dir 'acabar una feina, deixar-la llesta'. És un bon recurs per no repetir sempre «acabar»."
        }
    ],
    c2: [
        {
            prompt: "Aquesta és la persona ___ et vaig parlar.",
            options: ["que", "de qui", "de la que"],
            answer: 1,
            explanation: "Quan el relatiu va darrere d'una preposició i es refereix a una persona, cal fer servir «qui» o «el qual»: «de qui» o «de la qual». «Que» sol no pot dur preposició, i «de la que» no és correcte en aquest context."
        },
        {
            prompt: "Quina frase és correcta?",
            options: [
                "Va relliscar, trencant-se el canell.",
                "Va relliscar, havent-se trencat el canell.",
                "Va relliscar i es va trencar el canell."
            ],
            answer: 2,
            explanation: "El gerundi no pot expressar una acció posterior a la del verb principal (gerundi de posterioritat). Primer va relliscar i després es va trencar el canell, per tant cal coordinar les dues accions: «i es va trencar»."
        },
        {
            prompt: "El projecte és car; ___, és l'únic que resol el problema de fons.",
            options: ["per tant", "no obstant això", "és a dir"],
            answer: 1,
            explanation: "Entre les dues idees hi ha un contrast (és car, però és l'únic que funciona), així que cal un connector adversatiu: «no obstant això», «tanmateix» o «ara bé». «Per tant» indica conseqüència i «és a dir», reformulació."
        },
        {
            prompt: "«Li vaig preguntar pels diners, però es va fer l'orni.» Què vol dir «fer-se l'orni»?",
            options: ["Enfadar-se", "Posar-se a riure", "Fer veure que no ho entén"],
            answer: 2,
            explanation: "«Fer-se l'orni» vol dir 'fer el desentès, fer veure que no s'entén o que no se sap res'."
        },
        {
            prompt: "___ estava cansada, va acabar la feina.",
            options: ["Malgrat", "Malgrat que", "Tot i"],
            answer: 1,
            explanation: "«Malgrat» és una preposició i va seguida d'un nom: «malgrat el cansament». Davant d'un verb conjugat cal la conjunció «malgrat que». «Tot i» va seguit d'infinitiu («tot i estar cansada») o de «que» («tot i que estava cansada»)."
        }
    ]
};

const OTHER_LEVEL = { c1: "c2", c2: "c1" };

function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
}

function startQuiz(container, level) {
    const questions = QUESTIONS[level];
    let current = 0;
    let score = 0;

    function renderQuestion() {
        const q = questions[current];
        container.replaceChildren();

        container.append(el("p", "quiz-progress", `Pregunta ${current + 1} de ${questions.length}`));
        container.append(el("p", "quiz-question", q.prompt));

        const list = el("ul", "quiz-options");
        const buttons = q.options.map((text, index) => {
            const item = el("li");
            const button = el("button", "quiz-option", text);
            button.type = "button";
            button.addEventListener("click", () => answer(index, buttons));
            item.append(button);
            list.append(item);
            return button;
        });
        container.append(list);
        buttons[0].focus({ preventScroll: true });
    }

    function answer(chosen, buttons) {
        const q = questions[current];
        const isCorrect = chosen === q.answer;
        if (isCorrect) score++;

        buttons.forEach((button, index) => {
            button.disabled = true;
            if (index === q.answer) button.classList.add("is-correct");
            else if (index === chosen) button.classList.add("is-wrong");
        });

        const feedback = el("div", isCorrect ? "quiz-feedback is-right" : "quiz-feedback");
        feedback.append(el("p", "quiz-verdict", isCorrect
            ? "Correcte!"
            : `No és correcte. La resposta bona és «${q.options[q.answer]}».`));
        feedback.append(el("p", null, q.explanation));

        const isLast = current === questions.length - 1;
        const next = el("button", "btn-primary", isLast ? "Mostra el resultat" : "Següent pregunta");
        next.type = "button";
        next.addEventListener("click", () => {
            current++;
            if (isLast) renderResult();
            else renderQuestion();
        });
        feedback.append(next);

        container.append(feedback);
        next.focus({ preventScroll: true });
    }

    function renderResult() {
        container.replaceChildren();

        const total = questions.length;
        let message;
        if (score === total) message = "Perfecte! Tens el nivell ben treballat.";
        else if (score >= total - 2) message = "Molt bé! Amb una mica més de pràctica ho tindràs per la mà.";
        else message = "Encara hi ha feina, però per això hi som: practicant és com s'aprèn.";

        const result = el("div", "quiz-result");
        result.append(el("p", "quiz-score", `${score} de ${total}`));
        result.append(el("p", null, message));
        result.append(el("p", null, "Quan obrim, en trobaràs molts més com aquests, amb el teu progrés guardat."));

        const actions = el("div", "quiz-actions");
        const signup = el("a", "btn-primary", "Avisa'm quan obri");
        signup.href = "index.html#llista-espera";
        const retry = el("button", "btn-secondary", "Torna-ho a provar");
        retry.type = "button";
        retry.addEventListener("click", () => startQuiz(container, level));
        const other = el("a", "btn-secondary", `Prova el ${OTHER_LEVEL[level].toUpperCase()}`);
        other.href = `tastet.html?nivell=${OTHER_LEVEL[level]}`;
        actions.append(signup, retry, other);
        result.append(actions);

        container.append(result);
    }

    renderQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    const level = new URLSearchParams(window.location.search).get("nivell")?.toLowerCase();
    const container = document.getElementById("quiz");

    document.querySelectorAll(".level-tabs a").forEach(link => {
        if (link.dataset.level === level) link.setAttribute("aria-current", "page");
    });

    if (QUESTIONS[level]) {
        startQuiz(container, level);
    }
});
