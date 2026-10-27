const categoryButtons = [...document.querySelectorAll('.category')];
const dishes = [...document.querySelectorAll('.dish')];
const search = document.querySelector('#menu-search');
const emptyState = document.querySelector('#empty-state');
const label = document.querySelector('#menu-label');
const count = document.querySelector('#results-count');
let activeCategory = 'all';

function updateMenu() {
  const term = (search?.value || '').trim().toLocaleLowerCase('ru');
  let visible = 0;
  dishes.forEach((dish) => {
    const categoryMatches = activeCategory === 'all' || dish.dataset.category === activeCategory;
    const searchMatches = !term || `${dish.dataset.search} ${dish.innerText}`.toLocaleLowerCase('ru').includes(term);
    const show = categoryMatches && searchMatches;
    dish.hidden = !show;
    if (show) visible++;
  });
  emptyState.hidden = visible > 0;
  count.textContent = `${visible} ${visible === 1 ? 'позиция' : visible < 5 ? 'позиции' : 'позиций'}`;
  const selected = categoryButtons.find((button) => button.dataset.category === activeCategory);
  label.textContent = term ? `Результаты поиска: «${search.value}»` : activeCategory === 'all' ? 'Выбор гостей' : selected?.textContent || 'Меню';
}

categoryButtons.forEach((button) => button.addEventListener('click', () => {
  activeCategory = button.dataset.category;
  categoryButtons.forEach((item) => item.classList.toggle('active', item === button));
  updateMenu();
}));
search?.addEventListener('input', updateMenu);
document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    search?.focus();
  }
});

const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
toggle?.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  mobileNav.setAttribute('aria-hidden', String(!open));
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  mobileNav.setAttribute('aria-hidden', 'true');
}));
