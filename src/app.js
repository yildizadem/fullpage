class FullPage {
    constructor(params) {
        this.elements = {
            main: document.querySelector(".full-page"),
            indicators: document.createElement("div"),
        }
        this.sections = [];
        for (let i = 0; i < this.elements.main.childElementCount; i++) {
            let obj = this.createIndicator(this.elements.main.children.item(i), i);
            this.sections.push(obj);
        }
        this.elements.main.addEventListener("wheel", (event) => {
            event.preventDefault();
            event.deltaY > 0 ?
                this.next() :
                this.back()
        });
        this.initIndicators();
        params.interval && setInterval(() => {
            this.next();
        }, params.interval);
        params.animationDuration && document.querySelector(":root").style.setProperty("--transition-duration", params.animationDuration + "ms")
    }
    get activeSection() {
        return this.sections.find(sec => sec.isActive === true)
    }
    set activeSection(section) {
        this.activeSection.indicator.classList.remove("active");
        this.activeSection.element.classList.remove("active");
        this.activeSection.isActive = false;
        section.isActive = true;
        section.indicator.classList.add("active");
        section.element.classList.add("active");
    }
    createIndicator(element, index) {
        let indicator = document.createElement("div");
        index === 0 ?
            indicator.setAttribute("class", "item active") :
            indicator.setAttribute("class", "item");
        index === 0 && element.classList.add("active");
        indicator.addEventListener("click", () => {
            this.activeSection = this.sections[index];
        });
        this.elements.indicators.appendChild(indicator);
        return {
            element: element,
            indicator: indicator,
            index: index,
            isActive: index === 0 ? true : false
        };
    }
    initIndicators() {
        this.elements.indicators.setAttribute("class", "indicators");
        this.elements.main.appendChild(this.elements.indicators);
    }
    next() {
        let nextIndex = this.activeSection.index + 1;
        this.activeSection = this.sections[nextIndex] ?
            this.sections[nextIndex] :
            this.sections[0]
    }
    back() {
        let backIndex = this.activeSection.index - 1;
        this.activeSection = this.sections[backIndex] ?
            this.sections[backIndex] :
            this.sections[this.sections.length - 1]
    }
}

let fullPage = new FullPage({
    interval: 5000,
    animationDuration: 3000
});