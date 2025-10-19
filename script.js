// O código é envolvido em 'DOMContentLoaded' para garantir que todo o HTML seja carregado antes da execução.
document.addEventListener("DOMContentLoaded", function () {
  // a. Seleciona todos os links de paginação e garante que é um Array (para o .forEach funcionar)
  const linksPaginacao = Array.from(document.querySelectorAll(".paginacao a"));
  const totalPaginas = 5; // Define o número total de páginas (de 1 a 5)

  // b. Itera sobre os links e adiciona o ouvinte de evento
  linksPaginacao.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      let targetId;
      let linkAtivo = document.querySelector(".paginacao a.pagina-ativa");

      // --- 1. Determinar o ID de destino (targetId) ---
      if (this.classList.contains("next-link")) {
        // Lógica para o botão '>'

        // Trata o caso onde o link ativo pode ser a própria seta (se ele foi ativado no clique anterior)
        if (linkAtivo && linkAtivo.classList.contains("next-link")) {
          // Encontra o link numerado ativo para pegar o número.
          linkAtivo = document.querySelector(
            ".paginacao a:not(.next-link).pagina-ativa"
          );
        }

        // Se não houver link ativo numerado, assume a página 1 (como segurança)
        const paginaAtual = linkAtivo ? parseInt(linkAtivo.textContent) : 0;

        // Calcula a próxima página: (0+1=1), (1+1=2), ..., (5 % 5) + 1 = 1
        const proximaPagina = (paginaAtual % totalPaginas) + 1;
        targetId = `pagina-${proximaPagina}`;
      } else {
        // Lógica para os links numerados (1, 2, 3...)
        targetId = this.getAttribute("href").substring(1);
      }

      // --- 2. Desativar a página e o link Ativo Antigos ---

      // Remove 'pagina-ativa' de TODOS os links de paginação e de TODAS as divisões de obras.
      document.querySelectorAll(".pagina-ativa").forEach((el) => {
        el.classList.remove("pagina-ativa");
      });

      // --- 3. Ativar a Nova Página e Link ---

      // a. Ativa a NOVA página de obras (torna a div visível)
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.classList.add("pagina-ativa");

        // b. Ativa o link numerado correspondente para destaque.
        const linkParaAtivar = document.querySelector(
          `.paginacao a[href="#${targetId}"]`
        );
        if (linkParaAtivar) {
          linkParaAtivar.classList.add("pagina-ativa");
        }

        // c. Ativa a seta '>' e ajusta seu href
        const linkNext = document.querySelector(".next-link");
        linkNext.classList.add("pagina-ativa");

        const proximaPaginaParaLink =
          (parseInt(targetId.replace("pagina-", "")) % totalPaginas) + 1;
        linkNext.setAttribute("href", `#pagina-${proximaPaginaParaLink}`);

        // d. Rola suavemente para o topo da galeria.
        // Usamos o elemento pai (main) para rolar a galeria
        document
          .querySelector(".galeria")
          .scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
