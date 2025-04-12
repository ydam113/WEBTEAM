document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('blockCanvas');
  const ctx = canvas.getContext('2d');

  const blocks = [
    {
      x: 50,
      y: 100,
      width: 100,
      height: 60,
      color: '#007bff',
      hash: '0001A',
      index: 0,
      prevHash: '00000',
      data: 'A가 B에게 10 BTC 전송',
    },
    {
      x: 180,
      y: 100,
      width: 100,
      height: 60,
      color: '#28a745',
      hash: '0002B',
      index: 1,
      prevHash: '0001A',
      data: 'B가 C에게 5 BTC 전송',
    },
    {
      x: 310,
      y: 100,
      width: 100,
      height: 60,
      color: '#ffc107',
      hash: '0003C',
      index: 2,
      prevHash: '0002B',
      data: 'C가 D에게 2 BTC 전송',
    },
    {
      x: 440,
      y: 100,
      width: 100,
      height: 60,
      color: '#dc3545',
      hash: '0004D',
      index: 3,
      prevHash: '0003C',
      data: 'D가 A에게 1 BTC 전송',
    },
  ];

  function drawBlocks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blocks.forEach((block) => {
      ctx.fillStyle = block.color;
      ctx.fillRect(block.x, block.y, block.width, block.height);
      ctx.fillStyle = '#fff';
      ctx.font = '14px Pretendard, sans-serif';
      ctx.fillText(`블록 ${block.index}`, block.x + 10, block.y + 20);
      ctx.fillText(`#${block.hash}`, block.x + 10, block.y + 40);
    });

    // Draw arrows
    for (let i = 1; i < blocks.length; i++) {
      const from = blocks[i - 1];
      const to = blocks[i];
      drawArrow(
        from.x + from.width,
        from.y + from.height / 2,
        to.x,
        to.y + to.height / 2
      );
    }
  }

  function drawArrow(fromX, fromY, toX, toY) {
    ctx.strokeStyle = '#333';
    ctx.fillStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    const headlen = 10;
    const angle = Math.atan2(toY - fromY, toX - fromX);
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - headlen * Math.cos(angle - Math.PI / 6),
      toY - headlen * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - headlen * Math.cos(angle + Math.PI / 6),
      toY - headlen * Math.sin(angle + Math.PI / 6)
    );
    ctx.lineTo(toX, toY);
    ctx.fill();
  }

  function getBlockAt(x, y) {
    return blocks.find(
      (block) =>
        x >= block.x &&
        x <= block.x + block.width &&
        y >= block.y &&
        y <= block.y + block.height
    );
  }

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const block = getBlockAt(x, y);

    if (block) {
      showPopup(block);
    }
  });

  function showPopup(block) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.left = '50%';
    popup.style.top = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.background = 'white';
    popup.style.border = '2px solid var(--primary-color)';
    popup.style.borderRadius = '12px';
    popup.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)';
    popup.style.padding = '1.5rem 2rem';
    popup.style.zIndex = '10000';
    popup.innerHTML = `
      <h3 style="margin-top:0">🔍 블록 정보</h3>
      <p><strong>🧱 인덱스:</strong> ${block.index}</p>
      <p><strong>🔗 해시:</strong> ${block.hash}</p>
      <p><strong>↩️ 이전 해시:</strong> ${block.prevHash}</p>
      <p><strong>📦 데이터:</strong> ${block.data}</p>
      <p style="margin-top:1rem; font-size: 0.9rem; color: #555">※ 블록은 이전 블록의 해시값을 포함하고 있어 체인 구조를 형성합니다. 이는 데이터를 변경하기 어렵게 만들어 보안성과 무결성을 보장합니다.</p>
      <button id="closePopup" style="margin-top:1rem; padding:0.5rem 1rem; background:var(--accent-color); border:none; color:white; border-radius:8px; cursor:pointer;">닫기</button>
    `;

    document.body.appendChild(popup);

    document.getElementById('closePopup').addEventListener('click', () => {
      document.body.removeChild(popup);
    });
  }

  drawBlocks();
});

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}
