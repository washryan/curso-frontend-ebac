const btn = document.getElementById('btnCarregar');
const avatarEl = document.getElementById('profile-avatar');
const nameEl = document.getElementById('profile-name');
const usernameEl = document.getElementById('profile-username');
const profileLinkEl = document.getElementById('profile-link');

const repoCountEl = document.getElementById('repo-count');
const followersCountEl = document.getElementById('followers-count');
const followingCountEl = document.getElementById('following-count');

const repoListEl = document.getElementById('repo-list');
const errorEl = document.getElementById('error');

function getUsernameFromProfileLink() {
  try {
    const href = profileLinkEl.getAttribute('href') || '';
    const parts = href.split('/').filter(Boolean);
    return parts[parts.length - 1] || 'washryan';
  } catch (e) {
    return 'washryan';
  }
}

function setLoading(loading) {
  if (loading) {
    btn.classList.add('loading');
    btn.setAttribute('disabled', 'true');
    errorEl.textContent = '';
  } else {
    btn.classList.remove('loading');
    btn.removeAttribute('disabled');
  }
}

async function fetchGitHubProfile(username) {
  const url = `https://api.github.com/users/${username}`;
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  if (!res.ok) {
    const body = await res.json().catch(()=>({message: res.statusText}));
    const err = new Error(`Status ${res.status} - ${body.message || res.statusText}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function fetchGitHubRepos(username) {
  const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`;
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  if (!res.ok) {
    const body = await res.json().catch(()=>({message: res.statusText}));
    const err = new Error(`Status ${res.status} - ${body.message || res.statusText}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function loadProfile(username) {
  setLoading(true);
  try {
    const [profile, repos] = await Promise.all([
      fetchGitHubProfile(username),
      fetchGitHubRepos(username)
    ]);

    avatarEl.src = profile.avatar_url || avatarEl.src;
    nameEl.textContent = profile.name || profile.login || '—';
    usernameEl.textContent = '@' + (profile.login || username);
    profileLinkEl.href = profile.html_url || profileLinkEl.href;

    repoCountEl.textContent = profile.public_repos ?? '0';
    followersCountEl.textContent = profile.followers ?? '0';
    followingCountEl.textContent = profile.following ?? '0';

    repoListEl.innerHTML = '';
    if (Array.isArray(repos) && repos.length) {
      repos.forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${r.html_url}" target="_blank" rel="noopener noreferrer">${r.name}</a>
                        ${r.description ? ` - ${r.description}` : ''}
                        <span style="color:#999; margin-left:8px;">★ ${r.stargazers_count}</span>`;
        repoListEl.appendChild(li);
      });
    } else {
      repoListEl.innerHTML = '<li>Nenhum repositório encontrado.</li>';
    }

  } catch (err) {
    console.error('Erro ao buscar GitHub:', err);
    if (err.status === 403) {
      errorEl.textContent = 'Erro: limite de requisições atingido (rate limit do GitHub). Aguarde alguns minutos ou use autenticação.';
    } else if (err.status === 404) {
      errorEl.textContent = 'Usuário não encontrado no GitHub (404). Verifique o link/username.';
    } else {
      errorEl.textContent = 'Erro ao carregar perfil: ' + (err.message || 'ver console');
    }
  } finally {
    setLoading(false);
  }
}

btn.addEventListener('click', () => {
  const username = getUsernameFromProfileLink();
  loadProfile(username);
});

document.addEventListener('DOMContentLoaded', () => {
  const username = getUsernameFromProfileLink();
  loadProfile(username);
});
