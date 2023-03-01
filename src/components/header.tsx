import { FC } from "react";

export const Header: FC = () => {
  const handleThemeChange = () => {
    const html = document.documentElement;
    const theme = html.classList.contains("dark") ? "dark" : "light";
    const newTheme = theme === "dark" ? "light" : "dark";
    html.classList.remove(theme === "dark" ? "dark" : "light");
    html.classList.add(newTheme);
  };

  return (
    <header className="py-4">
      <nav className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>Some SVG LOGO</div>
          <button
            className="rounded-md bg-kohan-700 px-4 py-2 text-white"
            onClick={handleThemeChange}
          >
            Toggle theme
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <a href="/posts">Posts</a>
            <a href="/">Home</a>
          </div>
          <div className="flex gap-2">
            <button aria-label="Kohan twitter account link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-kohan-300"
                width="32px"
                height="32px"
              >
                <path d="M22,3.999c-0.78,0.463-2.345,1.094-3.265,1.276c-0.027,0.007-0.049,0.016-0.075,0.023c-0.813-0.802-1.927-1.299-3.16-1.299c-2.485,0-4.5,2.015-4.5,4.5c0,0.131-0.011,0.372,0,0.5c-3.353,0-5.905-1.756-7.735-4c-0.199,0.5-0.286,1.29-0.286,2.032c0,1.401,1.095,2.777,2.8,3.63c-0.314,0.081-0.66,0.139-1.02,0.139c-0.581,0-1.196-0.153-1.759-0.617c0,0.017,0,0.033,0,0.051c0,1.958,2.078,3.291,3.926,3.662c-0.375,0.221-1.131,0.243-1.5,0.243c-0.26,0-1.18-0.119-1.426-0.165c0.514,1.605,2.368,2.507,4.135,2.539c-1.382,1.084-2.341,1.486-5.171,1.486H2C3.788,19.145,6.065,20,8.347,20C15.777,20,20,14.337,20,8.999c0-0.086-0.002-0.266-0.005-0.447C19.995,8.534,20,8.517,20,8.499c0-0.027-0.008-0.053-0.008-0.08c-0.003-0.136-0.006-0.263-0.009-0.329c0.79-0.57,1.475-1.281,2.017-2.091c-0.725,0.322-1.503,0.538-2.32,0.636C20.514,6.135,21.699,4.943,22,3.999z" />
              </svg>
            </button>
            <button aria-label="Kohan github account link">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="32px"
                className="fill-kohan-300"
                height="32px"
              >
                <path d="M10.854,2.064C6.301,2.57,2.595,6.258,2.069,10.808c-0.547,4.729,2.21,8.896,6.26,10.495C8.651,21.431,9,21.176,9,20.83v-1.58c0,0-0.375,0.125-0.875,0.125c-1.399,0-1.98-1.248-2.125-1.875c-0.088-0.382-0.318-0.744-0.565-0.965C5.14,16.272,5.002,16.271,5,16.181C4.996,15.992,5.253,16,5.375,16C6,16,6.474,16.665,6.694,17.009C7.239,17.858,7.824,18,8.125,18c0.375,0,0.699-0.056,0.922-0.164C9.15,17.11,9.473,16.463,10,16c-2.345-0.469-4-1.814-4-4c0-1.126,0.452-2.161,1.205-2.997C7.128,8.785,7,8.344,7,7.625C7,7.15,7.033,6.567,7.25,6c0,0,1.426,0.01,2.771,1.284C10.642,7.103,11.306,7,12,7s1.358,0.103,1.979,0.284C15.324,6.01,16.75,6,16.75,6C16.968,6.567,17,7.15,17,7.625c0,0.775-0.103,1.227-0.166,1.422C17.564,9.875,18,10.894,18,12c0,2.186-1.655,3.531-4,4c0.626,0.55,1,1.351,1,2.25v2.58c0,0.346,0.348,0.6,0.67,0.473C19.377,19.84,22,16.227,22,12C22,6.1,16.89,1.393,10.854,2.064z" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
