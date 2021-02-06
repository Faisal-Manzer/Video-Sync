const emptyFunc = () => {};

class Query {
    constructor(selector = null) {
        if (selector) this.eles = document.querySelectorAll(selector);
        else this.eles = [document];
    }

    forEach(callback) {
        this.eles.forEach(ele => callback(ele));
    }

    on(events, func = emptyFunc, ...extra) {
        const evs = events.split(' ');
        events.split(' ').map(
            type => this.forEach(
                ele => ele.addEventListener(type, (e, ...others) => {
                    e.preventDefault();
                    func(e, ...others);
                }, ...extra)
            )
        );
        return this;
    }

    add(...classes) {
        this.forEach(ele => ele.classList.add(...classes));
    }

    remove(...classes) {
        this.forEach(ele => ele.classList.remove(...classes));
    }

    toggle(classes) {
        classes.split(' ').map(
            cl => this.forEach(
                ele => ele.classList.toggle(cl)
            )
        );
    }
}

const $ = (selector) => new Query(selector);
window.$ = $;
