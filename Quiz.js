class Quiz{
    select = (index) => this.update(() => {
        this.selected = index
    })

    Choices = (choices,questionNum) => choices.map((choice, alt) => {
        return /*html*/`
            <button
                class="center-things button-choice text-center text-button-choices"
                onclick="${this.self}.confirm(${questionNum},${alt})")
            >${choice}</button>
        `
    }).join('')

    Buttons = (index) => {
        let result = ''
        if(this.index != 0){
            result += /*html*/`
            <button class="center-things button-next" onclick="${this.self}.goBack(${index})">
                <span class="text-button">Anterior</span>
            </button>
            `
        }
        return result
    }

    Result = () => /*html*/`
        Voce é ${this.result}
    `

    Question = (number, question) => /*html*/`

    <div class="card">
		<img
			class="card-img-top center-things"
			src="${question.imagegif}"
			alt="Card image cap"
		>
		<div class="card-body">
		    <h5 class="card-title text-center">Pergunta ${number+1}:</h5>
			<p class="text-center">${question.title}</p>
            ${this.Choices(question.choices, number)}
            ${this.Buttons(number)}
		</div>
	</div>
    `

    Content = () => this.result ? /*html*/`
        ${this.Result()}`
        : /*html*/`
        ${this.Question(this.index,this.questions[this.index])}
        `

    update(action = () => {}){
        action()
        this.render()
    }

    constructor(self){
        this.questions = QUESTIONS
        this.self = self
        this.index = 0
        this.answers = []
        this.render()
    }

    getResult = () => {
        let each = {}
        this.answers.forEach(item => {
            each[item] = 0
        })
        this.answers.forEach(item => {
            each[item]++
        })
        let result = Object.keys(each).reduce((ax, x) =>
            each[ax] >= each[x] ?
                ax : x
        )

        return JSON.stringify(result)
    }

    confirm = (index,alt) => this.update(() => {
        let option = this.questions[index].results[alt]
        console.log('pergunta:',index+1, 'opcao',option)
        this.answers[index] = option

        if(this.index < this.questions.length -1){
            this.index++
        }
        else{
            this.result = this.getResult()
        }
    })

    goBack = (index) => this.update(() => {
        this.index--
    })

    render(){
        document.querySelector('#quiz').innerHTML = this.Content()
    }
}

quiz = new Quiz('quiz')
