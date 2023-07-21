(function () {
  // DOM - paginas
  const $containerMain = document.querySelector("main");
  const $navHome = document.querySelector("main .nav_paginas");
  const $biblioteca = document.querySelector(".nav_paginas .biblioteca");
  const $novo_livro = document.querySelector(".nav_paginas .novo_livro");
  const $emprestimos = document.querySelector(".nav_paginas .emprestimos");
  const $logout = document.querySelector("header div");

  $logout.addEventListener("click", () => {
    $logout.classList.toggle("active_logout");
  });

  // Fetch

  let data;

  fetch("../data.json")
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      data = body.data;
      data = data.books;
    });

  //Trocas de pagina

  //Pagina Historico de emprestimos

  $emprestimos.addEventListener("click", () => {
    const emprestimos = document.createElement("div");
    emprestimos.classList.add("pagina_emprestimos");
    emprestimos.innerHTML = `
      <nav class="nav_home">
        <a href="#" class="home">
          <img src="../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg" alt="Icone voltar" />
          Home
        </a>
        <p><b>/ Histórico de empréstimos</b></p>
      </nav>
      <table>
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Turma</th>
            <th>Livro</th>
            <th>Data da Retirada</th>
            <th>Data da Entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="alunos"><img src="../assets/svg/Caminho 147.svg" /></td>
            <td class="turmas"><img src="../assets/svg/Caminho 147.svg" /></td>
            <td class="livros"><img src="../assets/svg/Caminho 147.svg" /></td>
            <td class="retirada"><img src="../assets/svg/Caminho 147.svg" /></td>
            <td class="entrega"><img src="../assets/svg/Caminho 147.svg" /></td>
          </tr>
        </tbody>
      </table>
  `;

    $containerMain.removeChild($navHome);
    $containerMain.appendChild(emprestimos);

    const tbody = document.querySelector(".pagina_emprestimos table tbody");
    let firstTr = `
    <tr>
      <td class="alunos"><img src="../assets/svg/Caminho 147.svg" /></td>
      <td class="turmas"><img src="../assets/svg/Caminho 147.svg" /></td>
      <td class="livros"><img src="../assets/svg/Caminho 147.svg" /></td>
      <td class="retirada"><img src="../assets/svg/Caminho 147.svg" /></td>
      <td class="entrega"><img src="../assets/svg/Caminho 147.svg" /></td>
    </tr>
    `;

    //botoes filtro historico de emprestimos
    const $alunos = emprestimos.querySelector("table tbody tr .alunos");
    const $turmas = emprestimos.querySelector("table tbody tr .turmas");
    const $livros = emprestimos.querySelector("table tbody tr .livros");
    const $retirada = emprestimos.querySelector("table tbody tr .retirada");
    const $entrega = emprestimos.querySelector("table tbody tr .entrega");

    data.forEach((book) => {
      let arrayAlunos = book.rentHistory;

      function sortTable(index_row, typeSort) {
        function converterData(dataString) {
          const partes = dataString.split("/");
          const dia = parseInt(partes[0]);
          const mes = parseInt(partes[1]) - 1;
          const ano = parseInt(partes[2]);
          return new Date(ano, mes, dia);
        }

        const tbody = document.querySelector(".pagina_emprestimos table tbody");
        const rows = Array.from(tbody.rows).slice(1);
        const sortedRows = rows.sort((rowA, rowB) => {
          const nameA = rowA.cells[index_row].textContent.toLowerCase();
          const nameB = rowB.cells[index_row].textContent.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        const sortedRows2 = rows.sort((rowA, rowB) => {
          const nameA = converterData(rowA.cells[index_row].textContent);
          const nameB = converterData(rowB.cells[index_row].textContent);
          return nameA - nameB;
        });

        if (typeSort === true) {
          sortedRows.forEach((row) => tbody.appendChild(row));
        } else {
          sortedRows2.forEach((row) => tbody.appendChild(row));
        }
      }

      function putAluno(arrayAlunos) {
        arrayAlunos.forEach((aluno) => {
          const tr_emprestimos = document.createElement("tr");

          tr_emprestimos.innerHTML = `
              <td>${aluno.studentName}</td>
              <td>${aluno.class}</td>
              <td>${book.title}</td>
              <td>${aluno.withdrawalDate}</td>
              <td>${aluno.deliveryDate}</td>
            `;

          tbody.appendChild(tr_emprestimos);
        });
      }

      putAluno(arrayAlunos);

      $alunos.addEventListener("click", () => {
        sortTable(0, true);
      });

      $turmas.addEventListener("click", () => {
        sortTable(1, true);
      });

      $livros.addEventListener("click", () => {
        sortTable(2, true);
      });

      $retirada.addEventListener("click", () => {
        sortTable(3, false);
      });

      $entrega.addEventListener("click", () => {
        sortTable(4, false);
      });
    });

    //Voltar para a pagina home

    const $home = document.querySelector(".home");

    $home.addEventListener("click", () => {
      tbody.innerHTML = firstTr;
      $containerMain.removeChild(emprestimos);
      $containerMain.appendChild($navHome);
    });
  });

  //Pagina Cadastrar Novo Livro

  $novo_livro.addEventListener("click", () => {
    const novo_livro = document.createElement("div");
    novo_livro.classList.add("pagina_novo_livro");
    novo_livro.innerHTML = `
      <nav class="nav_home">
        <a href="#" class="home">
          <img src="../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg" alt="Icone voltar" />
          Home
        </a>
        <p><b>/ Cadastrar novo livro</b></p>
      </nav>
      <section class="section_adicionar_livro">
        <div class="container_adicionar_livro">
          <label class="capa">
            <input type="file" accept="image/*" class="input_image">
            <span class="label_image"></span>
          </label>

          <div class="container_input input_titulo">
            <input type="text" class="input_style" id="titulo" required />
            <label for="titulo">Título</label>
          </div>

          <div class="container_input input_sinopse">
            <textarea class="input_style" id="sinopse" required></textarea>
            <label for="sinopse">Sinopse</label>
          </div>

          <div class="container_input input_autor">
            <input type="text" class="input_style" id="autor" required />
            <label for="autor">Autor</label>
          </div>  

          <div class="container_select input_genero">
            <textarea readonly rows="1" class="default_option"></textarea>
            <p class="label_select">Gênero</p>
            <img src="../assets/svg/Polígono 4.svg" class="arrow" />
            <ul class="selected_option select">
            </ul>
          </div>

          <div class="container_input input_data">
            <input type="date" class="input_style" id="data" required />
            <label for="data">Data de entrada</label>
          </div>
        </div>
        <div class="container_botoes">
          <button class="botao_cancelar">Cancelar</button>
          <button class="botao_salvar">Salvar</button>
        </div>
      </section>
    `;

    $containerMain.removeChild($navHome);
    $containerMain.appendChild(novo_livro);

    //Animação e funcionalidade do select

    const $container_select = document.querySelector(".container_select");
    const $select_default = document.querySelector(".default_option");
    const $selected_option = document.querySelector(".selected_option");
    const $label_select = document.querySelector(".label_select");

    let filterGenre = data.reduce((items, currentItem) => {
      if (items.indexOf(currentItem.genre) < 0) {
        items.push(currentItem.genre);
      }
      return items;
    }, []);

    filterGenre.forEach((genre) => {
      const liGenre = document.createElement("li");
      liGenre.classList.add("option");
      liGenre.innerText = genre;

      $selected_option.appendChild(liGenre);
    });

    const $select_options = document.querySelectorAll(
      ".selected_option .option"
    );

    $container_select.addEventListener("click", () => {
      if (!$container_select.classList.contains("active")) {
        $container_select.classList.add("active");

        $select_options.forEach((option) => {
          option.addEventListener("click", () => {
            $select_default.innerText = option.textContent;
          });
        });
        if ($select_default.classList.contains("label_actived")) {
          $label_select.classList.remove("label_actived");
        } else {
          $label_select.classList.add("label_actived");
        }
      } else {
        if ($select_default.textContent === "") {
          $label_select.classList.remove("label_actived");
        }
        $container_select.classList.remove("active");
      }
    });

    //Input para inserir capa do livro

    const $input_file = document.querySelector(".capa .input_image");
    const $label_image = document.querySelector(".capa .label_image");

    $label_image.innerHTML = `
      <img src="../assets/svg/Caminho 261.svg" alt="Adicionar capa" />
      <p>Capa</p>
    `;

    $input_file.addEventListener("change", function (e) {
      const input_target = e.target;
      const file = input_target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.addEventListener("load", function (e) {
          const reader_target = e.target;

          const img = document.createElement("img");
          img.src = reader_target.result;
          img.classList.add("selected_img");

          $label_image.innerHTML = "";

          $label_image.appendChild(img);
        });

        reader.readAsDataURL(file);
      } else {
        $label_image.innerHTML = `
          <img src="../assets/svg/Caminho 261.svg" alt="Adicionar capa" />
          <p>Capa</p>
        `;
      }
    });

    //Salvar Livro e inserir informações no data.json

    const $title = document.querySelector(".input_titulo #titulo");
    const $sinopse = document.querySelector(".input_sinopse #sinopse");
    const $autor = document.querySelector(".input_autor #autor");
    const $genero = document.querySelector(".input_genero .default_option");
    const $dataEntrada = document.querySelector(".input_data #data");

    const $salvar = document.querySelector(".container_botoes .botao_salvar");

    $salvar.addEventListener("click", () => {
      function addBook(books) {
        const $title = document.querySelector(".input_titulo #titulo");
        const $sinopse = document.querySelector(".input_sinopse #sinopse");
        const $autor = document.querySelector(".input_autor #autor");
        const $genero = document.querySelector(".input_genero .default_option");
        const $dataEntrada = document.querySelector(".input_data #data");
        const $capa_img = document.querySelector(
          ".capa .label_image .selected_img"
        );

        let inputEntry = new Date($dataEntrada.value);

        let changedEntry = inputEntry.toLocaleDateString("pt-BR", {
          timeZone: "UTC",
        });

        let newBook = {
          title: $title.value,
          author: $autor.value,
          genre: $genero.value,
          status: {
            isActive: true,
            description: "",
          },
          image: $capa_img.src,
          systemEntryDate: changedEntry,
          synopsis: $sinopse.value,
          rentHistory: [],
        };

        books.push(newBook);
      }

      const $capa = document.querySelector(".capa .label_image");

      if (
        $title.value !== "" &&
        $sinopse.value !== "" &&
        $autor.value !== "" &&
        $genero.value !== "" &&
        $dataEntrada.value !== "" &&
        $capa.hasChildNodes()
      ) {
        addBook(data);
        $containerMain.removeChild(novo_livro);
        $containerMain.appendChild($navHome);

        alert("Livro cadastrado com sucesso!");
      } else {
        alert("Preencha todos os campos!");
        $title.value = "";
        $sinopse.value = "";
        $autor.value = "";
        $genero.value = "";
        $selected_option.innerHTML = "";
        $dataEntrada.value = "";
      }

      $label_image.innerHTML = `
        <img src="../assets/svg/Caminho 261.svg" alt="Adicionar capa" />
        <p>Capa</p>
      `;
    });

    //Cancelar cadastro de novo Livro

    const $cancelar = document.querySelector(
      ".container_botoes .botao_cancelar"
    );

    $cancelar.addEventListener("click", () => {
      $title.value = "";
      $sinopse.value = "";
      $autor.value = "";
      $genero.value = "";
      $selected_option.innerHTML = "";
      $dataEntrada.value = "";

      $containerMain.removeChild(novo_livro);

      $label_image.innerHTML = `
        <img src="../assets/svg/Caminho 261.svg" alt="Adicionar capa" />
        <p>Capa</p>
      `;

      $containerMain.appendChild($navHome);
    });

    //Voltar para a pagina home

    const $home = document.querySelector(".home");

    $home.addEventListener("click", () => {
      $title.value = "";
      $sinopse.value = "";
      $autor.value = "";
      $selected_option.innerHTML = "";
      $dataEntrada.value = "";

      $containerMain.removeChild(novo_livro);

      $label_image.innerHTML = `
        <img src="../assets/svg/Caminho 261.svg" alt="Adicionar capa" />
        <p>Capa</p>
      `;

      $containerMain.appendChild($navHome);
    });
  });

  //Pagina Biblioteca

  $biblioteca.addEventListener("click", () => {
    const biblioteca = document.createElement("div");
    biblioteca.classList.add("pagina_biblioteca");

    biblioteca.innerHTML = `
      <nav class="nav_home">
        <a href="#" class="home">
          <img src="../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg" alt="Icone voltar" />
          Home
        </a>
        <p><b>/ Biblioteca</b></p>
      </nav>
      <section>
        <div class="container_inputs">
          <form class="container_input_pesquisa">
            <label for="pesquisa"><img src="../assets/svg/Caminho 263.svg" alt="Pesquisar" /></label>
            <input type="text" id="pesquisa" placeholder="Pesquisar livro..." />
            <button type="submit" class="botao_input_pesquisa">Buscar</button>
          </form>
          <div class="container_select">
            <textarea readonly rows="1" class="default_option">Selecione</textarea>
            <p class="label_select">Ordenar</p>
            <img src="../assets/svg/Polígono 4.svg" class="arrow" />
            <ul class="selected_option select">
              <li class="option">Selecione</li>
              <li class="option">Gênero</li>
              <li class="option">Autor</li>
              <li class="option">Data de Entrada</li>
            </ul>
          </div>
        </div>
        <div class="container_livros"></div>
      </section>
      <div class="livro_selecionado hide"></div>
  `;

    $containerMain.removeChild($navHome);
    $containerMain.appendChild(biblioteca);

    const $input_pesquisa = document.getElementById("pesquisa");
    const $button_pesquisa = document.querySelector(".botao_input_pesquisa");
    const $container_select = document.querySelector(".container_select");
    const $select_default = document.querySelector(".default_option");
    const $select_options = document.querySelectorAll(
      ".selected_option .option"
    );
    const $background = document.querySelector(".background_opacity");
    const $selected_book = document.querySelector(".livro_selecionado");
    const $label_select = document.querySelector(".label_select");
    const container_livros = document.querySelector(".container_livros");

    //Funcao para ordenar categorias
    function ordenaCategoria() {
      let books = [...data];

      container_livros.innerHTML = "";

      if ($select_default.textContent === "Gênero") {
        books.sort((a, b) => (a.genre < b.genre ? -1 : 1));
        putBooks(books);
      } else if ($select_default.textContent === "Autor") {
        books.sort((a, b) => (a.author < b.author ? -1 : 1));
        putBooks(books);
      } else if ($select_default.textContent === "Data de Entrada") {
        function converterData(dataString) {
          const partes = dataString.split("/");
          const dia = parseInt(partes[0]);
          const mes = parseInt(partes[1]) - 1;
          const ano = parseInt(partes[2]);
          return new Date(ano, mes, dia);
        }

        books.sort(
          (a, b) =>
            converterData(b.systemEntryDate) - converterData(a.systemEntryDate)
        );
        putBooks(books);
      } else {
        putBooks(books);
      }
    }

    //Animação e funcionalidade do select

    $container_select.addEventListener("click", () => {
      if (!$container_select.classList.contains("active")) {
        $container_select.classList.add("active");

        $select_options.forEach((option) => {
          option.addEventListener("click", () => {
            $select_default.innerText = option.textContent;
            ordenaCategoria();
          });
        });
        if ($select_default.classList.contains("label_actived")) {
          $label_select.classList.remove("label_actived");
        } else {
          $label_select.classList.add("label_actived");
        }
      } else {
        if ($select_default.textContent === "Selecione") {
          $label_select.classList.remove("label_actived");
        }
        $container_select.classList.remove("active");
      }
    });

    //Pesquisar nome do livro desejado

    $button_pesquisa.addEventListener("click", (e) => {
      e.preventDefault();

      container_livros.innerHTML = "";

      const search_book = $input_pesquisa.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      const filtered_books = data.filter((book) =>
        book.title
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .includes(search_book)
      );

      putBooks(filtered_books);
    });

    //Inserir dados do data.json na tela

    container_livros.innerHTML = "";

    putBooks(data);

    function putBooks(books) {
      books.forEach((book) => {
        const card_book = document.createElement("div");

        card_book.classList.add("card_book");

        card_book.innerHTML = `
          <img src="${book.image}" alt="${book.title}">
          <h2>${book.title}</h2>
        `;

        container_livros.appendChild(card_book);

        const card_selected_infos = document.createElement("div");
        const card_selected_emprestado = document.createElement("div");
        const card_selected_historico = document.createElement("div");
        const card_selected_inativado = document.createElement("div");
        const body_historico = document.createElement("tbody");
        const table_historico = document.createElement("table");

        card_selected_infos.classList.add("selected_book_infos");
        card_selected_infos.classList.add("selected_book_infos_1");
        card_selected_emprestado.classList.add("selected_book_infos");
        card_selected_emprestado.classList.add("selected_book_infos_2");
        card_selected_historico.classList.add("selected_book_historico");
        card_selected_inativado.classList.add("selected_book_infos");
        card_selected_inativado.classList.add("selected_book_inativado");

        //Função para gerar todas as informações no card do livro selecionado

        function generateInfosBook(
          book,
          class_1,
          EmprestarDevolver,
          InativarAtivar,
          buttonAtivarInativar
        ) {
          return `
          <img src="../assets/svg/Caminho 265.svg" class="icone_fechar">
          <img src="${book.image}" alt="${book.title}">
          <button class="botao_devolucao ${class_1}" ><img src='../assets/svg/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg'> <p>${EmprestarDevolver}</p></button>
          <div class="textos">
            <h2>${book.title}</h2>
            <div class="texto_sinopse">
              <h3>Sinopse</h3>
              <p>${book.synopsis}</p>
            </div>
            <div class="texto_autor">
              <h3>Autor</h3>
              <p>${book.author}</p>
            </div>
            <div class="texto_genero">
              <h3>Gênero</h3>
              <p>${book.genre}</p>
            </div>
            <div class="texto_data">
              <h3>Data de Entrada</h3>
              <p>${book.systemEntryDate}</p>
            </div>
          </div>
          <div class="botoes_edicao">
            <button class="botao_editar botao_edicao">Editar</button>
            <button class="atividade botao_${buttonAtivarInativar} botao_edicao">${InativarAtivar}</button>
            <button class="botao_historico botao_edicao">Histórico</button>
          </div>
        `;
        }

        //Descrição da inativação

        const texto_inativacao = document.createElement("div");

        texto_inativacao.classList.add("descricao_inativacao");

        texto_inativacao.innerHTML = `
        <h2>Informações da inativação</h2>
        <div>
          <h3>Motivo</h3>
          <p>${book.status.description}</p>
        </div>
        `;

        //Body do histórico de cada livro

        body_historico.innerHTML = `
        <tr class="filtros">
          <td class="alunos"><img src="../assets/svg/Caminho 147.svg" /></td>
          <td class="turmas"><img src="../assets/svg/Caminho 147.svg" /></td>
          <td class="retirada"><img src="../assets/svg/Caminho 147.svg" /></td>
          <td class="entrega"><img src="../assets/svg/Caminho 147.svg" /></td>
        </tr>
        `;

        card_selected_historico.innerHTML = `
        <img src="../assets/svg/Caminho 265.svg" class="icone_fechar">
        <h2>Histórico de empréstimos do livro</h2>
        `;

        table_historico.innerHTML = `
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Turma</th>
            <th>Data da Retirada</th>
            <th>Data da Entrega</th>
          </tr>
        </thead>
        `;

        table_historico.appendChild(body_historico);

        card_selected_historico.appendChild(table_historico);

        //Inserir informações nos cards

        card_selected_infos.innerHTML = generateInfosBook(
          book,
          "botao_emprestar",
          "Emprestar",
          "Inativar",
          "inativar"
        );

        card_selected_emprestado.innerHTML = generateInfosBook(
          book,
          "botao_devolver",
          "Devolver",
          "Inativar",
          "inativar"
        );

        card_selected_inativado.innerHTML = generateInfosBook(
          book,
          "",
          "Emprestar",
          "Ativar",
          "ativar"
        );

        card_selected_inativado.appendChild(texto_inativacao);

        //Função para fechar card aberto

        function close(close_item) {
          close_item.addEventListener("click", () => {
            $selected_book.innerHTML = "";
            $background.classList.add("hide");
            $selected_book.classList.add("hide");
          });
        }

        //Funcção para mostrar histórico de cada livro

        function showHistorico(botao_historico) {
          botao_historico.addEventListener("click", () => {
            $selected_book.innerHTML = "";
            $selected_book.appendChild(card_selected_historico);

            const $alunos = document.querySelector(
              ".selected_book_historico table tbody tr .alunos"
            );
            const $turmas = document.querySelector(
              ".selected_book_historico table tbody tr .turmas"
            );
            const $retirada = document.querySelector(
              ".selected_book_historico table tbody tr .retirada"
            );
            const $entrega = document.querySelector(
              ".selected_book_historico table tbody tr .entrega"
            );

            function sortTable(index_row, typeSort) {
              function converterData(dataString) {
                const partes = dataString.split("/");
                const dia = parseInt(partes[0]);
                const mes = parseInt(partes[1]) - 1;
                const ano = parseInt(partes[2]);
                return new Date(ano, mes, dia);
              }

              const tbody = document.querySelector(
                ".selected_book_historico table tbody"
              );
              const rows = Array.from(tbody.rows).slice(1);
              const sortedRows = rows.sort((rowA, rowB) => {
                const nameA = rowA.cells[index_row].textContent.toLowerCase();
                const nameB = rowB.cells[index_row].textContent.toLowerCase();
                if (nameA < nameB) return -1;
                if (nameA > nameB) return 1;
                return 0;
              });

              const sortedRows2 = rows.sort((rowA, rowB) => {
                const nameA = converterData(rowA.cells[index_row].textContent);
                const nameB = converterData(rowB.cells[index_row].textContent);
                return nameA - nameB;
              });

              if (typeSort === true) {
                sortedRows.forEach((row) => tbody.appendChild(row));
              } else {
                sortedRows2.forEach((row) => tbody.appendChild(row));
              }
            }

            $alunos.addEventListener("click", () => {
              sortTable(0, true);
            });

            $turmas.addEventListener("click", () => {
              sortTable(1, true);
            });

            $retirada.addEventListener("click", () => {
              sortTable(2, false);
            });

            $entrega.addEventListener("click", () => {
              sortTable(3, false);
            });

            const icone_fechar_4 = document.querySelector(
              ".selected_book_historico .icone_fechar"
            );

            close(icone_fechar_4);
          });
        }

        //Evento de clique em cada livro

        card_book.addEventListener("click", () => {
          const nome_livro = card_book.querySelector("h2");

          $background.classList.remove("hide");
          $selected_book.classList.remove("hide");

          $selected_book.appendChild(card_selected_infos);
          $selected_book.appendChild(card_selected_inativado);
          $selected_book.appendChild(card_selected_emprestado);

          const $botao_ativar = document.querySelector(".botao_ativar");
          const $botao_inativar = document.querySelector(
            ".selected_book_infos .botao_inativar"
          );
          const $botao_emprestar = document.querySelector(
            ".selected_book_infos .botao_emprestar"
          );
          const $botao_editar = document.querySelector(".botao_editar");

          //Mostra as informações atualizadas

          if (
            card_selected_emprestado.classList.contains(
              "livro_selecionado_emprestado"
            ) &&
            book.title === nome_livro.textContent
          ) {
            $selected_book.removeChild(card_selected_infos);
            $selected_book.removeChild(card_selected_inativado);
          } else if (
            book.status.isActive === false &&
            nome_livro.textContent === book.title
          ) {
            $selected_book.removeChild(card_selected_infos);
            $selected_book.removeChild(card_selected_emprestado);
          } else {
            $selected_book.removeChild(card_selected_emprestado);
            $selected_book.removeChild(card_selected_inativado);
          }

          const botao_historico = document.querySelector(
            ".selected_book_infos .botao_historico"
          );
          const icone_fechar = document.querySelector(
            ".selected_book_infos .icone_fechar"
          );

          //Função para ativar livro

          $botao_ativar.addEventListener("click", () => {
            card_selected_inativado.removeChild(texto_inativacao);

            book.status.isActive = true;

            $selected_book.removeChild(card_selected_inativado);
            $selected_book.appendChild(card_selected_infos);

            const icone_fechar_2 = document.querySelector(
              ".selected_book_infos .icone_fechar"
            );

            close(icone_fechar_2);
          });

          //Função para inativar livro

          $botao_inativar.addEventListener("click", () => {
            const card_selected_inativar = document.createElement("div");

            card_selected_inativar.classList.add("selected_book_inativar");

            card_selected_inativar.innerHTML = `
                <img src="../assets/svg/Caminho 265.svg" class="icone_fechar">
                <h2>Inativar Livro</h2>
                <div class="container_inativar">
                    <textarea id="text_inativar" rows="5" required></textarea>
                    <label for="text_inativar">Descrição</label>
                </div>
                <button class="botao_inativar botao_edicao">Inativar</button>
                `;

            $selected_book.removeChild(card_selected_infos);
            $selected_book.appendChild(card_selected_inativar);

            const $texto_inativacao = document.querySelector(
              ".selected_book_inativar #text_inativar"
            );

            const icone_fechar_5 = document.querySelector(
              ".selected_book_inativar .icone_fechar"
            );
            const $botao_inativar_2 = document.querySelector(
              ".selected_book_inativar .botao_inativar"
            );

            close(icone_fechar_5);

            //Confirmar inativação e atualizar dados do card

            $botao_inativar_2.addEventListener("click", () => {
              if ($texto_inativacao.value !== "") {
                book.status.description = $texto_inativacao.value;

                book.status.isActive = false;

                $selected_book.removeChild(card_selected_inativar);
                $selected_book.appendChild(card_selected_inativado);

                texto_inativacao.innerHTML = `
                    <h2>Informações da inativação</h2>
                    <div>
                        <h3>Motivo</h3>
                        <p>${book.status.description}</p>
                    </div>
                `;

                card_selected_inativado.appendChild(texto_inativacao);

                const icone_fechar_6 = document.querySelector(
                  ".selected_book_inativado .icone_fechar"
                );

                close(icone_fechar_6);
              } else {
                alert("Preencha o campo com uma descrição válida");
              }
            });
          });

          //Função para emprestar livro

          $botao_emprestar.addEventListener("click", () => {
            const card_selected_emprestar = document.createElement("div");
            card_selected_emprestar.classList.add("selected_book_emprestar");

            card_selected_emprestar.innerHTML = `
                <img src="../assets/svg/Caminho 265.svg" class="icone_fechar">
                <h2 class="informe_dados">Informe os dados do aluno antes de continuar</h2>
                <form class="infos_emprestar">
                    <div class="inputText">
                        <input type="text" id="nome" required>
                        <label for="nome">Nome do Aluno</label>
                    </div>
                    <div class="inputText">
                        <input type="text" id="turma" required>
                        <label for="turma">Turma</label>
                    </div>
                    <div class="inputData">
                        <input type="date" id="dataRetirada" required>
                        <label for="dataRetirada">Data da retirada</label>
                    </div>
                    <div class="inputData">
                        <input type="date" id="dataEntrega" required>
                        <label for="dataEntrega">Data da entrega</label>
                    </div>
                    <button type="submit" class="botao_devolucao botao_emprestar_2"><img src='../assets/svg/auto_stories_FILL0_wght400_GRAD0_opsz48 (1).svg'> <p>Emprestar</p></button>
                </form>
                `;

            $selected_book.removeChild(card_selected_infos);
            $selected_book.appendChild(card_selected_emprestar);

            const icone_fechar_2 = document.querySelector(
              ".selected_book_emprestar .icone_fechar"
            );

            close(icone_fechar_2);

            const $nome = document.querySelector(
              ".selected_book_emprestar #nome"
            );
            const $turma = document.querySelector(
              ".selected_book_emprestar #turma"
            );
            const $dataRetirada = document.querySelector(
              ".selected_book_emprestar #dataRetirada"
            );
            const $dataEntrega = document.querySelector(
              ".selected_book_emprestar #dataEntrega"
            );

            $dataRetirada.addEventListener("change", () => {
              $dataEntrega.setAttribute("min", `${$dataRetirada.value}`);
            });

            const $emprestar_2 = document.querySelector(
              ".selected_book_emprestar .botao_emprestar_2"
            );

            //Confirmar emprestimo e atualizar os dados no card

            $emprestar_2.addEventListener("click", () => {
              if (
                $nome.value !== "" &&
                $turma.value !== "" &&
                $dataEntrega.value !== "" &&
                $dataRetirada.value !== "" &&
                $dataRetirada.value <= $dataEntrega.value
              ) {
                let inputWithdrawal = new Date($dataRetirada.value);
                let inputDelivery = new Date($dataEntrega.value);

                let changedWithdrawal = inputWithdrawal.toLocaleDateString(
                  "pt-BR",
                  { timeZone: "UTC" }
                );
                let changedDelivery = inputDelivery.toLocaleDateString(
                  "pt-BR",
                  { timeZone: "UTC" }
                );

                let aluno = {
                  studentName: $nome.value,
                  class: $turma.value,
                  withdrawalDate: changedWithdrawal,
                  deliveryDate: changedDelivery,
                };

                const tr_historico = document.createElement("tr");

                book.rentHistory.push(aluno);

                tr_historico.innerHTML = `
                    <td>${$nome.value}</td>
                    <td>${$turma.value}</td>
                    <td>${changedWithdrawal}</td>
                    <td>${changedDelivery}</td>
                  `;

                body_historico.appendChild(tr_historico);

                $selected_book.removeChild(card_selected_emprestar);

                card_selected_emprestado.classList.add(
                  "livro_selecionado_emprestado"
                );

                $selected_book.appendChild(card_selected_emprestado);

                const info_aluno = document.createElement("div");

                info_aluno.classList.add("infos_aluno");

                info_aluno.innerHTML = `
                  <h2>Dados do aluno</h2>
                      <div class="dados_aluno">
                      <div>
                          <h3>Nome do aluno</h3>
                          <p>${$nome.value}</p>
                      </div>
                      <div>
                          <h3>Turma</h3>
                          <p>${$turma.value}</p>
                      </div>
                      <div>
                          <h3>Data de retirada</h3>
                          <p>${changedWithdrawal}</p>
                      </div>
                      <div>
                          <h3>Data de entrega</h3>
                          <p>${changedDelivery}</p>
                      </div>
                      </div>
                  `;

                card_selected_emprestado.appendChild(info_aluno);

                const icone_fechar_3 = document.querySelector(
                  ".selected_book_infos_2 .icone_fechar"
                );

                const $devolver = document.querySelector(
                  ".selected_book_infos .botao_devolver"
                );

                close(icone_fechar_3);

                //Função para devolver livro e atualizar os dados no card

                $devolver.addEventListener("click", () => {
                  card_selected_emprestado.removeChild(info_aluno);

                  $selected_book.removeChild(card_selected_emprestado);

                  card_selected_emprestado.classList.remove(
                    "livro_selecionado_emprestado"
                  );

                  $selected_book.appendChild(card_selected_infos);
                });
              }
            });
          });

          //Função para editar livro

          $botao_editar.addEventListener("click", () => {
            const biblioteca = document.querySelector(".pagina_biblioteca");

            $containerMain.removeChild(biblioteca);

            const editar_livro = document.createElement("div");
            editar_livro.classList.add("pagina_editar");
            editar_livro.innerHTML = `
              <nav class="nav_home">
                <a href="#" class="home">
                  <img src="../assets/svg/chevron_left_FILL0_wght400_GRAD0_opsz48.svg" alt="Icone voltar" />
                  Home
                </a>
                <p><b>/ Editar livro</b></p>
              </nav>
              <section class="section_adicionar_livro">
                <div class="container_adicionar_livro">
                  <label class="capa">
                    <input type="file" accept="image/*" class="input_image">
                    <span class="label_image"></span>
                  </label>

                  <div class="container_input input_titulo">
                    <input type="text" class="input_style" id="titulo" required />
                    <label for="titulo">Título</label>
                  </div>

                  <div class="container_input input_sinopse">
                    <textarea class="input_style" id="sinopse" required></textarea>
                    <label for="sinopse">Sinopse</label>
                  </div>

                  <div class="container_input input_autor">
                    <input type="text" class="input_style" id="autor" required />
                    <label for="autor">Autor</label>
                  </div>

                  <div class="container_select input_genero">
                    <textarea readonly rows="1" class="default_option"></textarea>
                    <p class="label_select label_disabled">Gênero</p>
                    <img src="../assets/svg/Polígono 4.svg" class="arrow" />
                    <ul class="selected_option select">
                    </ul>
                  </div>

                  <div class="container_input input_data">
                    <input type="date" class="input_style" id="data" required />
                    <label for="data">Data de entrada</label>
                  </div>
                </div>
                <div class="container_botoes">
                  <button class="botao_cancelar">Cancelar</button>
                  <button class="botao_salvar">Salvar</button>
                </div>
              </section>
            `;

            $containerMain.appendChild(editar_livro);

            $background.classList.add("hide");
            $selected_book.classList.add("hide");

            //Animação e funcionalidade do select

            const $container_select =
              document.querySelector(".container_select");
            const $select_default = document.querySelector(".default_option");
            const $selected_option = document.querySelector(".selected_option");
            const $label_select = document.querySelector(".label_select");

            let filterGenre = data.reduce((items, currentItem) => {
              if (items.indexOf(currentItem.genre) < 0) {
                items.push(currentItem.genre);
              }
              return items;
            }, []);

            filterGenre.forEach((genre) => {
              const liGenre = document.createElement("li");
              liGenre.classList.add("option");
              liGenre.innerText = genre;

              $selected_option.appendChild(liGenre);
            });

            const $select_options = document.querySelectorAll(
              ".selected_option .option"
            );

            $container_select.addEventListener("click", () => {
              if (!$container_select.classList.contains("active")) {
                $container_select.classList.add("active");

                $select_options.forEach((option) => {
                  option.addEventListener("click", () => {
                    $select_default.innerText = option.textContent;
                  });
                });
                if ($select_default.classList.contains("label_actived")) {
                  $label_select.classList.remove("label_actived");
                } else {
                  $label_select.classList.add("label_actived");
                }
              } else {
                if ($select_default.textContent === "") {
                  $label_select.classList.remove("label_actived");
                }
                $container_select.classList.remove("active");
              }
            });

            //editar capa do livro

            const $input_file = document.querySelector(".capa .input_image");
            const $label_image = document.querySelector(".capa .label_image");

            $label_image.innerHTML = `
              <img src="${book.image}" alt="Adicionar capa" />
            `;

            $input_file.addEventListener("change", function (e) {
              const input_target = e.target;
              const file = input_target.files[0];

              if (file) {
                const reader = new FileReader();

                reader.addEventListener("load", function (e) {
                  const reader_target = e.target;

                  const img = document.createElement("img");
                  img.src = reader_target.result;
                  img.classList.add("selected_img");

                  $label_image.innerHTML = "";

                  $label_image.appendChild(img);
                });

                reader.readAsDataURL(file);
              } else {
                $label_image.innerHTML = `
                  <img src="${book.image}" alt="Adicionar capa" />
                  <p>Capa</p>
                `;
              }
            });

            //inserir informações do livro nos inputs

            const $titulo_1 = document.querySelector(".pagina_editar #titulo");
            const $sinopse_1 = document.querySelector(
              ".pagina_editar #sinopse"
            );
            const $autor_1 = document.querySelector(".pagina_editar #autor");

            const $data_1 = document.querySelector(".pagina_editar #data");

            function converterData(dataString) {
              const partes = dataString.split("/");
              const dia = partes[0].padStart(2, "0");
              const mes = partes[1].padStart(2, "0");
              const ano = partes[2];
              return `${ano}-${mes}-${dia}`;
            }

            $titulo_1.value = book.title;
            $sinopse_1.value = book.synopsis;
            $autor_1.value = book.author;
            $select_default.textContent = book.genre;
            $data_1.value = converterData(book.systemEntryDate);

            const $salvar = document.querySelector(
              ".pagina_editar .botao_salvar"
            );
            const $cancelar = document.querySelector(
              ".pagina_editar .botao_cancelar"
            );

            $salvar.addEventListener("click", () => {
              const $titulo_2 = document.querySelector(
                ".pagina_editar #titulo"
              );
              const $sinopse_2 = document.querySelector(
                ".pagina_editar #sinopse"
              );
              const $autor_2 = document.querySelector(".pagina_editar #autor");
              const $imgCapa = document.querySelector(
                ".pagina_editar .capa img"
              );
              const $genero_2 = document.querySelector(
                ".pagina_editar .default_option"
              );
              const $data_2 = document.querySelector(".pagina_editar #data");

              if (
                $titulo_2.value !== "" &&
                $sinopse_2.value !== "" &&
                $autor_2.value !== "" &&
                $data_2.value !== "" &&
                $genero_2.value !== ""
              ) {
                let inputEntry = new Date($data_2.value);

                let changedEntry = inputEntry.toLocaleDateString("pt-BR", {
                  timeZone: "UTC",
                });

                book.title = $titulo_2.value;
                book.image = $imgCapa.src;
                book.synopsis = $sinopse_2.value;
                book.author = $autor_2.value;
                book.genre = $genero_2.value;
                book.systemEntryDate = changedEntry;

                $containerMain.removeChild(editar_livro);
                $containerMain.appendChild(biblioteca);

                container_livros.innerHTML = "";

                $selected_book.innerHTML = "";

                putBooks(data);

                alert("Livro editado com sucesso!");
              } else {
                alert("Preencha todos os campos!");
              }
            });

            $cancelar.addEventListener("click", () => {
              $containerMain.removeChild(editar_livro);
              $containerMain.appendChild(biblioteca);

              container_livros.innerHTML = "";

              $selected_book.innerHTML = "";

              putBooks(data);
            });

            const $home = document.querySelector(".home");

            $home.addEventListener("click", () => {
              $containerMain.removeChild(editar_livro);

              $selected_book.innerHTML = "";

              $containerMain.appendChild($navHome);
            });
          });

          showHistorico(botao_historico);
          close(icone_fechar);
        });
      });
    }

    const $home = document.querySelector(".home");

    $home.addEventListener("click", () => {
      $input_pesquisa.value = "";
      $containerMain.removeChild(biblioteca);
      $containerMain.appendChild($navHome);
    });
  });
})();
