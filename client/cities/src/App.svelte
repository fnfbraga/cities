<script>
  import Select from "svelte-select";
  let name = "cities";
  let searchTerm = "";
  let cities = [];
  let items = [
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "30", label: "30" },
    { value: "50", label: "50" },
    { value: "100", label: "100" }
  ];
  let selectedValue = { value: "10", label: "10" };

  function searchCities(event) {
    event.preventDefault();
    const searchUrl = `http://localhost:3001/searchCity/?search=`;
    const searchString = `${searchUrl}${event.target.value}`;
    let url = new URL("http://localhost:3001/searchCity/");
    url.search = new URLSearchParams({
      search: event.target.value,
      options: +selectedValue.value
    });

    fetch(url)
      .then(response => response.json())
      .then(data => (cities = data));
  }
</script>

<style>
  main {
    text-align: left;
    padding: 1em;
    margin: 0 auto;
  }
  h1 {
    color:blue;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }
  input {
    border-radius: 3px;
    padding: 10px;
    height: 44px;
  }
  tr {
    text-align: left;
  }
  tr:hover {
    background-color: lightgray;
  }
  table {
    width: 100%;
    text-align: left;
    border-radius: 10px;
    border-width: 10px;
    border-color: lightgray;
  }
  .form-control:focus {
    outline-width: 0;
    box-shadow: 0px 0px 3px blue;
  }
  .searchResults {
    width: 50%;
    border-radius: 5px;
    border: solid 1px;
    padding: 5px;
    box-shadow: 0px 0px 2px blue;
  }
  .options {
    --width: 10%;
    --height: 50px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Search for {name}!</h1>
  <div class="header">
    <form>
      <input
        id="searchCity"
        class="form-control"
        placeholder="search for a city"
        type="text"
        bind:value={searchTerm}
        on:keyup={searchCities} />
    </form>
    <div class="options">
      <div>
      <p>Select desired number of results</p>
      <Select {items} bind:selectedValue />
      </div>
    </div>
  </div>
  {#if !cities}
    <p>loading...</p>
  {/if}
  {#if cities.suggestions}
    {#if cities.suggestions.length > 0}
      <div class="searchResults">
        <table>
          <tr>
            <th>City</th>
            <th>Score</th>
          </tr>
          {#each cities.suggestions as city}
            <tr>
              <td>{city.name}</td>
              <td>{city.score}</td>
            </tr>
          {/each}
        </table>
      </div>
    {/if}
  {/if}
</main>
