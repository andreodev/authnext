export const handleDelete = async (formData: {email: string}) => {
  const confirmDelete = window.confirm(
    "Tem certeza que deseja excluir seu perfil?"
  );
  if (!confirmDelete) return;

  try {
    const response = await fetch("/api/user/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData.email }),
    });

    if (response.ok) {
      alert("Perfil deletado com sucesso!");
      window.location.href = "/login";
    } else {
      alert("Erro ao excluir perfil.");
    }
  } catch (error) {
    console.error("Erro:", error);
    alert("Erro ao excluir o perfil. Se você estiver logado com o GitHub, também ocorrerá um erro.");
  }
};



