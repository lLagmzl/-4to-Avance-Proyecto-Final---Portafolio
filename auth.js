const API_BASE = "https://portfolio-api-three-black.vercel.app/api/v1";
const itsOnId = "252569";

async function getPublicProjects(itsonId) {
    try {
        const res = await fetch(`${API_BASE}/publicProjects/${itsonId}`);
        if (!res.ok) throw new Error("Error al obtener proyectos");
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

function createProjectCard(project) {
    const card = document.createElement("div");
    card.className = "project-card";

    const img = document.createElement("img");
    img.src = project.images[0] || "https://via.placeholder.com/300x200";
    img.alt = project.title;

    card.appendChild(img);
    card.addEventListener("click", () => openModal(project));

    return card;
}

const modal = document.getElementById("project-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalRepo = document.getElementById("modal-repo");
const closeBtn = document.querySelector(".close");

function openModal(project) {
    modal.style.display = "flex";
    modalImg.src = project.images[0] || "https://via.placeholder.com/300x200";
    modalTitle.textContent = project.title;
    modalDesc.textContent = project.description;
    modalRepo.href = project.repository;
}

closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
});

async function renderProjects() {
    const projectsContainer = document.getElementById("projects-container");
    const projects = await getPublicProjects(itsOnId);

    if (projects.length === 0) {
        projectsContainer.textContent = "No hay proyectos públicos aún.";
        return;
    }

    projects.forEach(project => {
        const card = createProjectCard(project);
        projectsContainer.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", renderProjects);