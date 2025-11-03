const STORAGE_KEY = 'alpine-todo-list';
const THEME_KEY = 'alpine-todo-theme';

function uid() {
  return `${Date.now()}-${window.crypto.getRandomValues(new Uint32Array(1))[0]}`;
}

window.todoApp = function () {
  return {
    todos: [],
    draft: '',
    filter: 'all',
    darkMode: false,

    init() {
      this.loadTodos();
      this.loadTheme();
      this.$watch('todos', () => this.persist());
    },

    loadTodos() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.todos = JSON.parse(stored);
        }
      } catch (error) {
        console.warn('Failed to parse todos from storage', error);
      }
    },

    loadTheme() {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored) {
        this.darkMode = stored === 'dark';
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.darkMode = true;
      }
      this.applyTheme();
    },

    addTodo() {
      if (!this.draft) return;
      this.todos = [
        {
          id: uid(),
          title: this.draft,
          completed: false,
        },
        ...this.todos,
      ];
      this.draft = '';
      this.persist();
    },

    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
      this.persist();
    },

    clearCompleted() {
      this.todos = this.todos.filter((todo) => !todo.completed);
      this.persist();
    },

    toggleTheme() {
      this.applyTheme();
      localStorage.setItem(THEME_KEY, this.darkMode ? 'dark' : 'light');
    },

    applyTheme() {
      document.documentElement.dataset.theme = this.darkMode ? 'dark' : 'light';
    },

    persist() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos));
    },

    get filteredTodos() {
      switch (this.filter) {
        case 'active':
          return this.todos.filter((todo) => !todo.completed);
        case 'completed':
          return this.todos.filter((todo) => todo.completed);
        default:
          return this.todos;
      }
    },

    get remaining() {
      return this.todos.filter((todo) => !todo.completed).length;
    },
  };
};
