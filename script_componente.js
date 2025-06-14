class AulasComponent extends HTMLElement {
  constructor() {
      super();
      this.hoje = "ter";
  }

  connectedCallback() {
      this.loadData();
  }

  async loadData() {
      try {
          const response = await fetch('aulas.json');
          const aulas = await response.json();
          this.render(aulas);
      } catch (error) {
          console.error('Erro ao carregar os dados das aulas:', error);
      }
  }

  render(aulas) {
    const aulasDia = aulas.filter(a => a.data === this.hoje);

    this.innerHTML = '';

    this.innerHTML += `
        <div>
            ${aulasDia.map(a => {
                let provaDisplay = a.prova_alert ? '' : 'display: none;';

                let notaClasse = "";
                if (a.nota < 6) {
                    notaClasse = "nota-ruim";
                } else if (a.nota >= 6 && a.nota < 8) {
                    notaClasse = "nota-boa";
                } else {
                    notaClasse = "nota-otima";
                }

                return `
                    <div class="aula">
                        <div class="lable-prova p_lable" style="${provaDisplay}">PROVA: <b>${a.prova}</b></div>
                        <div class="titulo_aula">${a.disciplina}</div>
                        <p class="p">Local e Horário: <b>${a.local} - ${a.horario}</b></p>
                        <div class="lables">
                            <div class="lable-frequencia p_lable">FALTAS: <b>${a.frequencia}</b></div>
                            <div class="lable-nota p_lable ${notaClasse}">CR: <b>${a.nota}</b></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
  }
}

customElements.define('aulas-component', AulasComponent);
