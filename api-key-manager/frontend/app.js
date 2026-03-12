

  try {
    const res = await fetch("/api/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, secret })
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    // Clear inputs after success
    titleInput.value = "";
    secretInput.value = "";

    showStatus("Key created successfully!");
    load();
  } catch (err) {
    showStatus("Failed to create key: " + err.message, true);
  } finally {
    btn.disabled = false;
    btn.textContent = "+ Add Key";
  }
}


async function remove(id) {
  if (!confirm("Delete this key? This cannot be undone.")) return;

  try {
    const res = await fetch(`/api/${id}`, { method: "DELETE" });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    showStatus("Key deleted.");
    load();
  } catch (err) {
    showStatus("Failed to delete key: " + err.message, true);
  }
}


async function load() {
  const container = document.getElementById("list");

  try {
    const res = await fetch("/api/list");

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();


    container.innerHTML = "";

    if (data.length === 0) {
      const empty = document.createElement("p");
      empty.className = "empty";
      empty.textContent = "No keys stored yet.";
      container.appendChild(empty);
      return;
    }

    data.forEach(d => {

      const card = document.createElement("div");
      card.className = "item";

      const titleEl = document.createElement("div");
      titleEl.className = "item-title";
      titleEl.textContent = d.title;          // textContent is XSS-safe

      const secretEl = document.createElement("div");
      secretEl.className = "item-secret";
      secretEl.textContent = "Secret: ••••••••"; // never expose encrypted value

      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => remove(d.id);

      card.appendChild(titleEl);
      card.appendChild(secretEl);
      card.appendChild(deleteBtn);
      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = "";
    const errEl = document.createElement("p");
    errEl.className = "status error";
    errEl.textContent = "Could not load keys: " + err.message;
    container.appendChild(errEl);
  }
}


load();

