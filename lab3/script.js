document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const sidebar = document.getElementById('sidebar');
    
    burgerMenu.addEventListener('click', () => {
        burgerMenu.classList.toggle('hamburger-menu--active'); // Меняем стиль бургер-меню
        if (sidebar.style.left === '0px') {
            sidebar.style.left = '-250px'; // Закрываем боковую панель
        } else {
            sidebar.style.left = '0px'; // Открываем боковую панель
        }
    });
});
