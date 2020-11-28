const base_url = "https://api.football-data.org/v2";
const api_token = "e8ec6b1af5c347c39b15bdb742c399e5";
const id_liga = 2021;

function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        return Promise.reject(new Error(response.statusText));
    } else {
        return Promise.resolve(response);
    }
}

function json(response) {
    return response.json();
}
function error(error) {
    console.log("Error : " + error);
}

function getStandings() {
    if ('caches' in window) {
        caches.match(`${base_url}/competitions/${id_liga}/standings`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    let standingsHTML = "";
                    data = data.standings[0].table;

                    data.forEach(function (standing) {
                        let urlTeamImage = standing.team.crestUrl
                        urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                        standingsHTML +=
                            `
                        <tr>
                            <td>${standing.position}</td>
                            <td><img src="${urlTeamImage}" alt="${standing.team.name}" style="float:left;" class="responsive-img" width="30">${standing.team.name}</td>
                            <td>${standing.playedGames}</td>
                            <td>${standing.won}</td>
                            <td>${standing.draw}</td>
                            <td>${standing.lost}</td>
                            <td>${standing.points}</td>
                            <td>${standing.goalsFor}</td>
                            <td>${standing.goalsAgainst}</td>
                            <td>${standing.goalDifference}</td>
                        </tr>
                        
                        `;
                    });

                    document.getElementById("standings").innerHTML = standingsHTML;
                })
            }
        })
    }

    fetch(`${base_url}/competitions/${id_liga}/standings`, {
        headers: {
            'X-Auth-Token': api_token
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            let standingsHTML = "";
            data = data.standings[0].table;

            data.forEach(function (standing) {
                let urlTeamImage = standing.team.crestUrl
                urlTeamImage = urlTeamImage.replace(/^http:\/\//i, 'https://')
                standingsHTML +=
                    `
                    <tr>
                        <td>${standing.position}</td>
                        <td><img src="${urlTeamImage}" alt="${standing.team.name}" style="float:left;" class="responsive-img" width="30">${standing.team.name}</td>
                        <td>${standing.playedGames}</td>
                        <td>${standing.won}</td>
                        <td>${standing.draw}</td>
                        <td>${standing.lost}</td>
                        <td>${standing.points}</td>
                        <td>${standing.goalsFor}</td>
                        <td>${standing.goalsAgainst}</td>
                        <td>${standing.goalDifference}</td>
                    </tr>
                    `;
            });
            document.getElementById("preloader").innerHTML = "";
            document.getElementById("standings").innerHTML = standingsHTML;
        })
        .catch(error);
}

function getMatches() {
    if ('caches' in window) {
        caches.match(`${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`).then(function (response) {
            if (response) {
                response.json().then(function (data) {
                    let matchesHTML = "";

                    data.matches.forEach(function (match) {
                        matchesHTML += `
                        <div class="col s12 m6">
                            <div class="card" style="background-color: #3f1052;">
                                <div class="card-content white-text">
                                    <span>${new Date(match.utcDate).toLocaleDateString()}</span> |
                                    <span>${new Date(match.utcDate).toLocaleTimeString()}</span>
                                    <br><br>
                                    <div class="row center-align">
                                        <div><strong>${match.homeTeam.name}</strong></div>
                                        <div>vs</div>
                                        <div><strong>${match.awayTeam.name}</strong></div>
                                    </div>
                                </div>
                                <div class="card-action right-align">
                                    <a class="btn waves-effect waves-light pink accent-3" href="./detailMatch.html?id=${match.id}">
                                        <i class="material-icons left">details</i>detail
                                    </a>
                                </div>
                            </div>
                        </div>
                        `;
                    });

                    document.getElementById("preloader").innerHTML = "";
                    document.getElementById("matches").innerHTML = matchesHTML;
                })
            }
        })
    }

    fetch(`${base_url}/competitions/${id_liga}/matches?status=SCHEDULED`, {
        headers: {
            'X-Auth-Token': api_token
        }
    })
        .then(status)
        .then(json)
        .then(function (data) {
            let matchesHTML = "";

            data.matches.forEach(function (match) {
                matchesHTML += `
                        <div class="col s12 m6">
                            <div class="card" style="background-color: #3f1052;">
                                <div class="card-content white-text">
                                    <span>${new Date(match.utcDate).toLocaleDateString()}</span> |
                                    <span>${new Date(match.utcDate).toLocaleTimeString()}</span> <br>
                                    <span>Matchday : ${match.matchday}</span>
                                    <br><br>
                                    <div class="row center-align">
                                        <div><strong>${match.homeTeam.name}</strong></div>
                                        <div>vs</div>
                                        <div><strong>${match.awayTeam.name}</strong></div>
                                    </div>
                                </div>
                                <div class="card-action right-align">
                                    <a class="btn waves-effect waves-light pink accent-3" href="./detailMatch.html?id=${match.id}">
                                        <i class="material-icons left">details</i>detail
                                    </a>
                                </div>
                            </div>
                        </div>
                    `;
            });

            document.getElementById("preloader").innerHTML = "";
            document.getElementById("matches").innerHTML = matchesHTML;
        })
        .catch(error);

}

function getMatchById() {
    return new Promise(function (resolve, reject) {

        // Ambil nilai query parameter (?id=)
        const urlParams = new URLSearchParams(window.location.search);
        const idParam = urlParams.get("id");

        if ("caches" in window) {
            caches.match(`${base_url}/matches/${idParam}`).then(function (response) {
                if (response) {
                    response.json().then(function (data) {
                        let matchHTML = "";

                        h = data.head2head;
                        m = data.match;

                        matchHTML += `
                        <h4>Detail Pertandingan</h4>
                        <div class="row">
                            <div class="col s12 m12 l12">
                            <div class="card" style="background-color: #3f1052;">
                                <div class="card-content white-text">
                                    <span>Matchday : ${m.matchday}</span> <br>
                                    <span>${new Date(m.utcDate).toLocaleDateString()}</span> |
                                    <span>${new Date(m.utcDate).toLocaleTimeString()}</span> <br>
                                    <span class="center-align">Venue : ${m.venue}</span>
                                    <div class="row center-align">
                                        <div><h5>${m.homeTeam.name}</h5></div>
                                        <div><span>vs</span></div>
                                        <div><h5>${m.awayTeam.name}</h5></div>
                                    </div>
                                </div>
                                <div class="card-action white-text">
                                    <div class="center-align">Head-to-Head</div>
                                    <div class="center-align">Number of Matches: ${h.numberOfMatches}</div>
                                    <div class="center-align">Total Goals: ${h.totalGoals}</div>
        
                                    <table class="centered" style="margin-top: 30px; margin-bottom: 30px;">
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td>${h.homeTeam.wins}</td>
                                                <td style="font-weight: bold;">Wins</td>
                                                <td>${h.awayTeam.wins}</td>
                                            </tr>
                                            <tr>
                                                <td>${h.homeTeam.draws}</td>
                                                <td style="font-weight: bold;">Draws</td>
                                                <td>${h.awayTeam.draws}</td>
                                            </tr>
                                            <tr>
                                                <td>${h.homeTeam.losses}</td>
                                                <td style="font-weight: bold;">Loses</td>
                                                <td>${h.awayTeam.losses}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                        </div>
                        `;

                        document.getElementById("preloader").innerHTML = "";
                        document.getElementById("body-content").innerHTML = matchHTML;
                        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
                        resolve(data);
                    });
                }
            });
        }

        fetch(`${base_url}/matches/${idParam}`, {
            headers: {
                'X-Auth-Token': api_token
            }
        })
            .then(status)
            .then(json)
            .then(function (data) {
                let matchHTML = "";

                h = data.head2head;
                m = data.match;

                matchHTML += `
                <h4>Detail Pertandingan</h4>
                <div class="row">
                    <div class="col s12 m12 l12">
                    <div class="card" style="background-color: #3f1052;">
                        <div class="card-content white-text">
                            <span>Matchday : ${m.matchday}</span> <br>
                            <span>${new Date(m.utcDate).toLocaleDateString()}</span> |
                            <span>${new Date(m.utcDate).toLocaleTimeString()}</span> <br>
                            <span class="center-align">Venue : ${m.venue}</span>
                            <div class="row center-align">
                                <div><h5>${m.homeTeam.name}</h5></div>
                                <div><span>vs</span></div>
                                <div><h5>${m.awayTeam.name}</h5></div>
                            </div>
                        </div>
                        <div class="card-action white-text">
                            <div class="center-align">Head-to-Head</div>
                            <div class="center-align">Number of Matches: ${h.numberOfMatches}</div>
                            <div class="center-align">Total Goals: ${h.totalGoals}</div>

                            <table class="centered" style="margin-top: 30px; margin-bottom: 30px;">
                                <thead></thead>
                                <tbody>
                                    <tr>
                                        <td>${h.homeTeam.wins}</td>
                                        <td style="font-weight: bold;">Wins</td>
                                        <td>${h.awayTeam.wins}</td>
                                    </tr>
                                    <tr>
                                        <td>${h.homeTeam.draws}</td>
                                        <td style="font-weight: bold;">Draws</td>
                                        <td>${h.awayTeam.draws}</td>
                                    </tr>
                                    <tr>
                                        <td>${h.homeTeam.losses}</td>
                                        <td style="font-weight: bold;">Loses</td>
                                        <td>${h.awayTeam.losses}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    </div>
                </div>
                `;

                document.getElementById("preloader").innerHTML = "";
                document.getElementById("body-content").innerHTML = matchHTML;

                resolve(data);
            });
    });
}

function getSavedMatches() {
    getAll().then(function (matches) {
        let matchesHTML = "";

        if (matches == "") {
            matchesHTML += `
                <div class="col s12">
                    <div class="card" style="background-color: #3f1052;">
                        <div class="card-content white-text center-align">
                            <span class="card-title">Belum ada jadwal pertandingan yang di simpan.</span>
                        </div>
                    </div>
                </div>
                `;
        } else {
            matches.forEach(function (match) {

                m = match.match

                matchesHTML += `
                    <div class="col s12 m6">
                        <div class="card" style="background-color: #3f1052;">
                            <div class="card-content white-text">
                                <span>${new Date(m.utcDate).toLocaleDateString()}</span> |
                                <span>${new Date(m.utcDate).toLocaleTimeString()}</span> <br>
                                <span>Matchday : ${m.matchday}</span>
                                <br><br>
                                <div class="row center-align">
                                    <div><strong>${m.homeTeam.name}</strong></div>
                                    <div>vs</div>
                                    <div><strong>${m.awayTeam.name}</strong></div>
                                </div>
                            </div>
                            <div class="card-action right-align">
                                <a class="btn waves-effect waves-light pink accent-3" href="./detailMatch.html?id=${m.id}&saved=true">
                                    <i class="material-icons left">details</i>detail
                                </a>
                                <a class="btn waves-effect waves-light pink accent-3" onclick="if (confirm('Yakin ingin menghapus jadwal ${m.homeTeam.name} vs ${m.awayTeam.name} ?')) {deleteById(${m.id}); pushNotification('Jadwal pertandingan ${m.homeTeam.name} vs ${m.awayTeam.name} berhasil di hapus.');}">
                                    <i class="material-icons left">delete</i>hapus
                                </a>
                            </div>
                        </div>
                    </div>
                    `;
            });
        }

        document.getElementById("matches").innerHTML = matchesHTML;
    });
}

function getSavedMatchById() {
    // Ambil nilai query parameter (?id=)
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");

    getById(idParam).then(function (match) {

        let matchHTML = "";

        h = match.head2head;
        m = match.match;

        matchHTML += `
            <h4>Detail Pertandingan</h4>
            <div class="row">
                <div class="col s12 m12 l12">
                <div class="card" style="background-color: #3f1052;">
                    <div class="card-content white-text">
                        <span>Matchday : ${m.matchday}</span> <br>
                        <span>${new Date(m.utcDate).toLocaleDateString()}</span> |
                        <span>${new Date(m.utcDate).toLocaleTimeString()}</span> <br>
                        <span class="center-align">Venue : ${m.venue}</span>
                        <div class="row center-align">
                            <div><h5>${m.homeTeam.name}</h5></div>
                            <div><span>vs</span></div>
                            <div><h5>${m.awayTeam.name}</h5></div>
                        </div>
                    </div>
                    <div class="card-action white-text">
                        <div class="center-align">Head-to-Head</div>
                        <div class="center-align">Number of Matches: ${h.numberOfMatches}</div>
                        <div class="center-align">Total Goals: ${h.totalGoals}</div>

                        <table class="centered" style="margin-top: 30px; margin-bottom: 30px;">
                            <thead></thead>
                            <tbody>
                                <tr>
                                    <td>${h.homeTeam.wins}</td>
                                    <td style="font-weight: bold;">Wins</td>
                                    <td>${h.awayTeam.wins}</td>
                                </tr>
                                <tr>
                                    <td>${h.homeTeam.draws}</td>
                                    <td style="font-weight: bold;">Draws</td>
                                    <td>${h.awayTeam.draws}</td>
                                </tr>
                                <tr>
                                    <td>${h.homeTeam.losses}</td>
                                    <td style="font-weight: bold;">Loses</td>
                                    <td>${h.awayTeam.losses}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
            </div>
            `;
        document.getElementById("preloader").innerHTML = "";
        document.getElementById("body-content").innerHTML = matchHTML;
    })
}