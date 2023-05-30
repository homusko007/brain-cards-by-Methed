import { createCategory } from "./components/createCategory.js";
import { createEditCategory } from "./components/createEditCategory.js";
import { createHeader } from "./components/createHeader.js";
import { createElement } from "./helper/createElement.js";
import { fetchCards, fetchCategories, fetchCreateCategory, fetchDeleteCategory, fetchEditCategory } from "./service/api.service.js";
import { createPairs } from "./components/createPairs.js";
import { showAlert } from "./components/showAlert.js";

const initApp = async () => {
  const headerParent = document.querySelector(".header");
  const app = document.querySelector("#app");

  const headerObj = createHeader(headerParent);
  const categoryObj = createCategory(app);
  const editCategoryObj = createEditCategory(app);
  const pairsObj = createPairs(app);

  const allSectionUnmount = () => {
    [categoryObj, editCategoryObj, pairsObj].forEach((obj) => obj.unmount());
    /* или editCategoryObj.unmount();
    editCategoryObj.unmount();*/
  };

  const postHendler = async () =>{
    const data = editCategoryObj.parseData();
    const dataCategory = await fetchCreateCategory(data);

    if (dataCategory.error) {
      showAlert(dataCategory.error.message);
      return;
    }

    showAlert(`Ноая категория ${data.title} была добавлена`);
    allSectionUnmount();
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(dataCategory);
  };

  const patchHendler = async () =>{
    const data = editCategoryObj.parseData();
    const dataCategory = await fetchEditCategory(
      editCategoryObj.btnSave.dataset.id, data);

    if (dataCategory.error) {
      showAlert(dataCategory.error.message);
      return;
    }

    showAlert(`Ноая категория ${data.title} обновлена`);
    allSectionUnmount();
    headerObj.updateHeaderTitle("Категории");
    categoryObj.mount(dataCategory);
  };

  const renderIndex = async (e) => {
    e?.preventDefault();
    allSectionUnmount();
    const categories = await fetchCategories();
    headerObj.updateHeaderTitle("Категории");
    if (categories.error) {
      app.append(
        createElement("p", {
          className: "server-error",
          textContent: "Ошибка сервера, попробуйте зайти позже",
        })
      );
      return;
    }

    categoryObj.mount(categories);
  };

  renderIndex();

  headerObj.headerLogoLink.addEventListener("click", renderIndex);

  headerObj.headerBtn.addEventListener("click", () => {
    allSectionUnmount();
    headerObj.updateHeaderTitle("Новая категория");
    editCategoryObj.mount();
    editCategoryObj.btnSave.addEventListener('click', postHendler);
    editCategoryObj.btnSave.removeEventListener('click', patchHendler)
  });

  categoryObj.categoryList.addEventListener("click", async ({ target }) => {
    const categoryItem = target.closest(".category__item");

    if (target.closest(".category__edit")) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle("Редактирование");
      editCategoryObj.mount(dataCards);
      editCategoryObj.btnSave.addEventListener('click', patchHendler);
      editCategoryObj.btnSave.removeEventListener('click', postHendler)
      return;
    }

    if (target.closest(".category__del")) {
      if (confirm('Удалить категорию?')) {
        const result = await fetchDeleteCategory(categoryItem.dataset.id);

        if (result.error) {
          showAlert(result.error.message);
          return;
        }

        showAlert('Категория удалена');
        categoryItem.remove();
      }
      return;
    }

    if (categoryItem) {
      const dataCards = await fetchCards(categoryItem.dataset.id);
      allSectionUnmount();
      headerObj.updateHeaderTitle(dataCards.title);
      pairsObj.mount(dataCards);
    }
  });

  pairsObj.btnReturn.addEventListener('click', renderIndex);
};

initApp();
