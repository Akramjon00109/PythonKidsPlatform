let pyodideInstance: any = null;
let loadingPromise: Promise<any> | null = null;

export async function loadPyodide() {
  if (pyodideInstance) {
    return pyodideInstance;
  }

  if (loadingPromise) {
    return loadingPromise;
  }

  loadingPromise = (async () => {
    try {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
      
      const loadPromise = new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
      
      document.head.appendChild(script);
      await loadPromise;

      const pyodide = await (window as any).loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
      });

      pyodideInstance = pyodide;
      return pyodide;
    } catch (error) {
      loadingPromise = null;
      throw error;
    }
  })();

  return loadingPromise;
}

export async function runPythonCode(code: string): Promise<{ output: string; error: string | null }> {
  try {
    const pyodide = await loadPyodide();
    
    let output = '';
    let error: string | null = null;

    pyodide.setStdout({
      batched: (text: string) => {
        output += text;
      }
    });

    pyodide.setStderr({
      batched: (text: string) => {
        output += text;
      }
    });

    try {
      await pyodide.runPythonAsync(code);
    } catch (err: any) {
      error = translateError(err.message);
    }

    return { output: output || 'Kod muvaffaqiyatli bajarildi!', error };
  } catch (err: any) {
    return { 
      output: '', 
      error: 'Python yuklanmadi. Iltimos, internetga ulanishni tekshiring.' 
    };
  }
}

function translateError(errorMessage: string): string {
  const translations: { [key: string]: string } = {
    'SyntaxError': 'Sintaksis xatosi',
    'NameError': 'Noma\'lum o\'zgaruvchi yoki funksiya',
    'TypeError': 'Noto\'g\'ri ma\'lumot turi',
    'ValueError': 'Noto\'g\'ri qiymat',
    'IndentationError': 'Satr boshi xatosi (indent)',
    'ZeroDivisionError': 'Nolga bo\'lish mumkin emas',
    'IndexError': 'Ro\'yxat elementi topilmadi',
    'KeyError': 'Kalit topilmadi',
    'AttributeError': 'Attribut topilmadi',
    'ImportError': 'Modulni yuklab bo\'lmadi',
  };

  let translatedError = errorMessage;
  
  for (const [eng, uz] of Object.entries(translations)) {
    if (errorMessage.includes(eng)) {
      translatedError = translatedError.replace(eng, `❌ ${uz}`);
    }
  }

  if (translatedError.includes('invalid syntax')) {
    translatedError += '\n\n💡 Maslahat: Kod yozishda qoidalarga rioya qiling. Qavs va nuqta-vergullarni tekshiring.';
  } else if (translatedError.includes('not defined')) {
    translatedError += '\n\n💡 Maslahat: O\'zgaruvchi yoki funksiyani ishlatishdan oldin uni yarating.';
  } else if (translatedError.includes('indentation')) {
    translatedError += '\n\n💡 Maslahat: Python da satr boshi (indent) juda muhim. Har bir blokni to\'g\'ri satr boshidan boshlang.';
  }

  return translatedError;
}
